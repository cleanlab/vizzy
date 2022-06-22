import percentile from 'percentile'
import { PredProbsEntryProps } from '../components/predProbs/types'
import { Datapoint } from '../components/dataset/types'

const argMax = (array) => {
  return [].reduce.call(array, (m, c, i, arr) => (c > arr[m] ? i : m), 0)
}

const computeClassThresholds = (
  predProbsData: Record<string, PredProbsEntryProps>,
  classes,
  classPercentile
) => {
  let classToProbs: Record<string, number[]> = {
    mouse: [],
    cat: [],
    dog: [],
  }
  Object.values(predProbsData).forEach((v) => {
    const arg_max = argMax(v.probabilities)
    const argMaxClass = classes[arg_max]
    classToProbs[argMaxClass].push(v.probabilities[arg_max])
  })
  return Object.entries(classToProbs).reduce((acc, [className, probs]) => {
    acc[className] = percentile(classPercentile, probs)
    return acc
  }, {})
}

const constructConfidentJoint = (
  predProbsData: Record<string, PredProbsEntryProps>,
  classes,
  thresholds
) => {
  const data = Object.values(predProbsData).reduce((acc, elt, idx) => {
    const predProbs = elt.probabilities
    const maxPredProbs = Math.max(...predProbs)
    const argMaxPredProbs = argMax(predProbs)
    const argMaxClass = classes[argMaxPredProbs]
    const classThreshold = thresholds[argMaxClass]
    let suggestedLabel = null
    if (maxPredProbs >= classThreshold) {
      suggestedLabel = argMaxClass
    }
    acc[elt.id] = {
      ...elt,
      suggestedLabel: suggestedLabel,
    }
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

const train = async (
  id_to_embeddings,
  imageDataset: Record<string, Datapoint>,
  classes: Array<string>
) => {
  const SVM = await require('libsvm-js/asm')
  const svm = new SVM({
    kernel: SVM.KERNEL_TYPES.RBF, // The type of kernel I want to use
    type: SVM.SVM_TYPES.C_SVC, // The type of SVM I want to run
    gamma: 1, // RBF kernel gamma parameter
    cost: 1, // C_SVC cost parameter
  })
  console.log('loaded svm')

  const numFolds = 5
  const classToIndex = classes.reduce((acc, c, idx) => {
    acc[c] = idx
    return acc
  }, {})

  const indexToClass = classes.reduce((acc, c, idx) => {
    acc[idx] = c
    return acc
  }, {})

  const ids = Object.keys(id_to_embeddings)
  const folds = splitArrayIntoKFolds(shuffleArray(ids), numFolds)
  console.log('constructing k folds')
  const predProbsData = {}
  for (let i = 0; i < numFolds; i++) {
    console.log(`training fold ${i}`)
    let train_ids = folds.slice(0, i).concat(folds.slice(i + 1))
    let test_ids = folds[i]

    let train_features = train_ids.map((id) => id_to_embeddings[id])
    let test_features = test_ids.map((id) => id_to_embeddings[id])
    let train_labels = ids.map((id) => classToIndex[imageDataset[id].givenLabel])
    svm.train(train_features, train_labels) // train the model
    let test_preds = svm.predictOneProbability(test_features)
    test_ids.reduce((acc, id, idx) => {
      predProbsData[id] = test_preds[idx]
      return acc
    }, predProbsData)
  }
  console.log('pred probs', predProbsData)
}
const exports = {
  argMax,
  computeClassThresholds,
  constructConfidentJoint,
  train,
}
export default exports
