import percentile from 'percentile'
import { PredProbsEntryProps } from '../components/predProbs/types'
import { Datapoint } from '../components/dataset/types'
import { zip } from 'lodash'
import thresholds from '../components/predProbs/Thresholds'

const argMax = (array) => {
  return [].reduce.call(array, (m, c, i, arr) => (c > arr[m] ? i : m), 0)
}

const computeClassThresholds = (
  predProbsData: Record<string, PredProbsEntryProps>,
  classes,
  classPercentile
) => {
  let classToProbs: Record<string, number[]> = {
    bear: [],
    cat: [],
    dog: [],
  }
  Object.values(predProbsData).forEach((v) => {
    const arg_max = argMax(v.probabilities)
    const argMaxClass = classes[arg_max]
    classToProbs[argMaxClass].push(v.probabilities[arg_max])
  })
  return Object.entries(classToProbs).reduce((acc, [className, probs]) => {
    // console.log('probs for thresholds', probs)
    // let mean = probs.reduce((a, b) => a + b) / probs.length
    // acc[className] = mean
    acc[className] = percentile(classPercentile, probs) || 1
    return acc
  }, {})
}

const constructConfidentJoint = (
  predProbsData: Record<string, PredProbsEntryProps>,
  classes,
  classThresholds,
  OODThresholds
) => {
  const data = Object.values(predProbsData).reduce((acc, elt, idx) => {
    const predProbs = elt.probabilities
    const maxPredProbs = Math.max(...predProbs)
    const argMaxPredProbs = argMax(predProbs)
    const argMaxClass = classes[argMaxPredProbs]
    const classThreshold = classThresholds[argMaxClass]

    let suggestedLabel = null
    if (maxPredProbs >= classThreshold) {
      suggestedLabel = argMaxClass
    }
    let OOD = true
    predProbs.forEach((prob, idx) => {
      if (prob >= OODThresholds[classes[idx]]) {
        OOD = false
      }
    })
    acc[elt.id] = { ...elt, suggestedLabel, OOD }
    return acc
  }, {})
  return data
}

const shuffleArray = (unshuffled) => {
  return unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const splitArrayIntoKFolds = (arr, numFolds = 5) => {
  let chunks = [],
    i = 0,
    n = arr.length

  let chunkSize = Math.floor(n / numFolds)
  let remainder = n % numFolds
  while (i < n) {
    let foldSize = chunkSize + (remainder > 0 ? 1 : 0)
    if (remainder) {
      remainder -= 1
    }
    chunks.push(arr.slice(i, (i += foldSize)))
  }
  return chunks
}

const computePredProbs = async (
  imageDataset: Record<string, Datapoint>,
  classes: Array<string>
) => {
  const SVM = await require('libsvm-js/asm')
  const svm = new SVM({
    kernel: SVM.KERNEL_TYPES.RBF, // The type of kernel I want to use
    type: SVM.SVM_TYPES.C_SVC, // The type of SVM I want to run
    gamma: 0.01, // RBF kernel gamma parameter
    cost: 10, // C_SVC cost parameter
    probabilityEstimates: true,
  })
  console.log('loaded svm')

  const numFolds = 5
  const classToIndex = classes.reduce((acc, c, idx) => {
    acc[c] = idx
    return acc
  }, {})

  // const indexToClass = classes.reduce((acc, c, idx) => {
  //   acc[idx] = c
  //   return acc
  // }, {})

  const ids = Object.keys(imageDataset)
  const folds = splitArrayIntoKFolds(shuffleArray(ids), numFolds)
  console.log('constructing k folds')
  const predProbsData = ids.reduce((acc, id) => {
    acc[id] = null
    return acc
  }, {})

  for (let i = 0; i < numFolds; i++) {
    console.log(`training fold ${i}`)
    let train_ids = folds
      .slice(0, i)
      .concat(folds.slice(i + 1))
      .flat()
    let test_ids = folds[i]
    let train_features = train_ids.map((id) => imageDataset[id].embedding)
    let test_features = test_ids.map((id) => imageDataset[id].embedding)
    let train_labels = train_ids.map((id) => classToIndex[imageDataset[id].givenLabel])

    svm.train(train_features, train_labels) // train the model
    let test_preds = svm.predictProbability(test_features)
    test_ids.reduce((acc, id, idx) => {
      const probs = test_preds[idx].estimates.reduce(
        (predsArray, labelAndProb) => {
          const labelIdx = Number(labelAndProb.label)
          predsArray[labelIdx] = labelAndProb.probability
          return predsArray
        },
        [0, 0, 0]
      )
      predProbsData[id] = { ...imageDataset[id], probabilities: probs }
      return acc
    }, predProbsData)
  }
  return predProbsData
}
const exports = {
  argMax,
  computeClassThresholds,
  constructConfidentJoint,
  computePredProbs,
}
export default exports
