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
  Object.values(predProbsData).map((v) => {
    const arg_max = argMax(v.probabilities)
    const argMaxClass = classes[arg_max]
    classToProbs[argMaxClass].push(v.probabilities[arg_max])
  })
  const thresholds = Object.entries(classToProbs).reduce((acc, elt) => {
    acc[elt[0]] = percentile(classPercentile, elt[1])
    return acc
  }, {})

  return thresholds
}

export default {
  argMax,
  computeClassThresholds,
}
