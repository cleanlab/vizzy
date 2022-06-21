import percentile from 'percentile'
import { PredProbsEntryProps } from '../components/predProbs/types'

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

const train = async () => {
  const SVM = await require('libsvm-js/asm')
  const svm = new SVM({
    kernel: SVM.KERNEL_TYPES.RBF, // The type of kernel I want to use
    type: SVM.SVM_TYPES.C_SVC, // The type of SVM I want to run
    gamma: 1, // RBF kernel gamma parameter
    cost: 1, // C_SVC cost parameter
  })
  const features = [
    [0, 0],
    [1, 1],
    [1, 0],
    [0, 1],
  ]
  const labels = [0, 0, 1, 1]
  svm.train(features, labels) // train the model
  const predProbs = svm.predictOneProbability([0.7, 0.8])
  console.log('pred probs', predProbs)
}
const exports = {
  argMax,
  computeClassThresholds,
  train,
}
export default exports
