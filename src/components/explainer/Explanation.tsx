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
        <>
          <Text>
            This probability is above the <strong>{classPercentile}th</strong> percentile class
            threshold for <strong>{predictedClass}</strong>.
          </Text>
          <Text>
            As such, Cleanlab is confident that the given label of{' '}
            <strong>{datapoint.givenLabel}</strong> is <strong>correct</strong>.
          </Text>
        </>
      )
    } else {
      return (
        <>
          <Text>
            This probability is above the <strong>{classPercentile}th</strong> percentile class
            threshold for <strong>{predictedClass}s</strong>.
          </Text>
          <Text>
            As such, Cleanlab is confident that the given label of{' '}
            <strong>{datapoint.givenLabel}</strong> is <strong>incorrect</strong>.
          </Text>
        </>
      )
    }
  }
  // below threshold
  if (isOOD) {
    return (
      <>
        <Text>
          Each predicted probability is below the respective <strong>{OODPercentile}th</strong>{' '}
          percentile out-of-distribution thresholds.
        </Text>
        <Text>
          As such, it is considered <strong>out of distribution</strong> -- it does not belong to
          any class or is an atypical example of a class.
        </Text>
      </>
    )
  }

  // below threshold, not OOD
  if (givenEqualsSuggested) {
    return (
      <>
        <Text>
          This is below the <strong>{classPercentile}th</strong> percentile class threshold of{' '}
          <strong>{predictedClassThreshold.toFixed(3)}</strong> for{' '}
          <strong>{predictedClass}s</strong>.
        </Text>
        <Text>
          As such, Cleanlab agrees (but is not confident) that the given label is{' '}
          <strong>correct</strong>.
        </Text>
      </>
    )
  } else {
    return (
      <>
        <Text>
          This is below the <strong>{classPercentile}th</strong> percentile class threshold for{' '}
          <strong>{predictedClass}s</strong>
        </Text>
        <Text>
          Cleanlab infers (but is not confident) that the given label is <strong>incorrect</strong>.
        </Text>
      </>
    )
  }
}

export default Explanation
