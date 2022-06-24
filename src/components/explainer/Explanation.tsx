import React from 'react'
import { chakra, Text } from '@chakra-ui/react'
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
  const {
    datapoint,
    classes,
    predProbs,
    classPercentile,
    classThresholds,
    OODPercentile,
    OODThresholds,
    isOOD,
  } = props
  const predictedClass = classes[util.argMax(predProbs.probabilities)]
  const predictedClassProb = Math.max(...predProbs.probabilities)
  const predictedClassThreshold = classThresholds[predictedClass]

  const aboveClassThreshold = predictedClassProb > predictedClassThreshold
  const givenEqualsSuggested = predictedClass === datapoint.givenLabel

  if (aboveClassThreshold) {
    if (givenEqualsSuggested) {
      return (
        <>
          <Text fontSize={'sm'}>
            This is above the <chakra.span fontWeight={600}>{classPercentile}th</chakra.span>{' '}
            percentile class threshold for{' '}
            <chakra.span fontWeight={600}>{predictedClass}s</chakra.span>.
          </Text>
          <Text fontSize={'sm'}>
            As such, Cleanlab is confident that the given label of{' '}
            <chakra.span fontWeight={600}>{datapoint.givenLabel}</chakra.span> is{' '}
            <chakra.span fontWeight={600}>correct</chakra.span>.
          </Text>
        </>
      )
    } else {
      return (
        <>
          <Text fontSize={'sm'}>
            This is above the <chakra.span fontWeight={600}>{classPercentile}th</chakra.span>{' '}
            percentile class threshold for{' '}
            <chakra.span fontWeight={600}>{predictedClass}s</chakra.span>.
          </Text>
          <Text fontSize={'sm'}>
            As such, Cleanlab is confident that the given label of{' '}
            <chakra.span fontWeight={600}>{datapoint.givenLabel}</chakra.span> is{' '}
            <chakra.span fontWeight={600}>incorrect</chakra.span>.
          </Text>
        </>
      )
    }
  }
  // below threshold
  if (isOOD) {
    return (
      <>
        <Text fontSize={'sm'}>
          Each predicted probability is below the respective{' '}
          <chakra.span fontWeight={600}>{OODPercentile}th</chakra.span> percentile
          out-of-distribution thresholds.
        </Text>
        <Text fontSize={'sm'}>
          As such, it is deemed <chakra.span fontWeight={600}>out of distribution</chakra.span> --
          does not belong to any class or is an atypical example of a class.
        </Text>
      </>
    )
  }

  // below threshold, not OOD
  if (givenEqualsSuggested) {
    return (
      <>
        <Text fontSize={'sm'}>
          This is below the <chakra.span fontWeight={600}>{classPercentile}th</chakra.span>{' '}
          percentile class threshold of{' '}
          <chakra.span fontWeight={600}>{predictedClassThreshold.toFixed(3)}</chakra.span> for{' '}
          <chakra.span fontWeight={600}>{predictedClass}s</chakra.span>.
        </Text>
        <Text fontSize={'sm'}>
          As such, Cleanlab agrees (but is not confident) that the given label is{' '}
          <chakra.span fontWeight={600}>correct</chakra.span>.
        </Text>
      </>
    )
  } else {
    return (
      <>
        <Text fontSize={'sm'}>
          This is below the <chakra.span fontWeight={600}>{classPercentile}th</chakra.span>{' '}
          percentile class threshold for{' '}
          <chakra.span fontWeight={600}>{predictedClass}s</chakra.span>
        </Text>
        <Text fontSize={'sm'}>
          Cleanlab infers (but not is not confident) that the given label is{' '}
          <chakra.span fontWeight={600}>incorrect</chakra.span>.
        </Text>
      </>
    )
  }
}

export default Explanation
