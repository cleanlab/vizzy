import React from 'react'
import { Text } from '@chakra-ui/react'
import { PredProbsEntryProps } from '../predProbs/types'
import { Datapoint } from '../dataset/types'
import util from '../../model/util'

interface ExplanationProps {
  datapoint: Datapoint
  classes: Array<string>
  predProbs: PredProbsEntryProps
  classPercentile: number
  classThresholds: Record<string, number>
  OODPercentile: number
  OODThresholds: Record<string, number>
  isOOD: boolean
}

const Explanation = (props: ExplanationProps) => {
  const { datapoint, classes, predProbs, classPercentile, classThresholds, OODPercentile, isOOD } =
    props
  const predictedClass = classes[util.argMax(predProbs.probabilities)]
  const predictedClassProb = Math.max(...predProbs.probabilities)
  const predictedClassThreshold = classThresholds[predictedClass]

  const aboveClassThreshold = predictedClassProb > predictedClassThreshold
  const givenEqualsSuggested = predictedClass === datapoint.givenLabel

  if (aboveClassThreshold) {
    if (givenEqualsSuggested) {
      return (
        <Text>
          As such, Cleanlab is confident that the given label of{' '}
          <strong>{datapoint.givenLabel}</strong> is <strong>correct</strong>.
        </Text>
      )
    } else {
      return (
        <Text>
          As such, Cleanlab is confident that the given label of{' '}
          <strong>{datapoint.givenLabel}</strong> is <strong>incorrect</strong>.
        </Text>
      )
    }
  }
  // below threshold
  if (isOOD) {
    return (
      <Text>
        It is deemed <strong>out-of-distribution</strong>, i.e. belongs to no class or is an
        atypical example of a class.
      </Text>
    )
  }

  // below threshold, not OOD
  if (givenEqualsSuggested) {
    return (
      <Text>
        As such, Cleanlab agrees (but is not confident) that the given label is{' '}
        <strong>correct</strong>.
      </Text>
    )
  } else {
    return (
      <Text>
        Cleanlab infers (but is not confident) that the given label is <strong>incorrect</strong>.
      </Text>
    )
  }
}

export default Explanation
