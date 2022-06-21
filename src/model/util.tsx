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

const exports = {
  argMax,
  computeClassThresholds,
}
export default exports
