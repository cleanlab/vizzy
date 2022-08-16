import React from 'react'
import { Flex, Text, VStack } from '@chakra-ui/react'
import { Datapoint } from '../dataset/types'
import { LabelIssue } from '../issues/types'
import { PredProbsEntryProps } from '../predProbs/types'
import util from '../../model/util'
import ExplainerImage from './ExplainerImage'

interface ExplainerProps {
  imageDataset: Record<string, Datapoint>
  predProbsData: Record<string, PredProbsEntryProps>
  classThresholds: Record<string, number>
  classes: Array<string>
  classPercentile: number
  OODPercentile: number
  OODData: Record<string, LabelIssue>
  activeImageId: string
}

const Explainer = (props: ExplainerProps) => {
  const {
    imageDataset,
    predProbsData,
    classThresholds,
    classes,
    classPercentile,
    OODPercentile,
    OODData,
    activeImageId,
  } = props

  if (!activeImageId) {
    return (
      <Flex h={'100%'} width={'100%'} justify={'center'} align={'center'} p={6}>
        <Text fontSize={'lg'} fontStyle={'italic'} textAlign={'center'}>
          Train the model and mouse over an image for more details!
        </Text>
      </Flex>
    )
  }
  const predProbs = predProbsData[activeImageId]
  const predictedClass = classes[util.argMax(predProbs.probabilities)]
  const predictedClassProb = Math.max(...predProbs.probabilities)
  const isOOD = OODData ? Object.keys(OODData).includes(activeImageId) : false
  const datapoint = imageDataset[activeImageId]
  const predictedClassThreshold = classThresholds[predictedClass]
  const aboveClassThreshold = predictedClassProb > predictedClassThreshold
  const givenEqualsSuggested = predictedClass === datapoint.givenLabel

  return (
    <VStack h={'100%'} width={'100%'} align={'space-between'} px={1}>
      <VStack w={'100%'} align={'center'} h={'90%'} spacing={1}>
        <ExplainerImage
          src={datapoint.src}
          givenLabel={datapoint.givenLabel}
          suggestedLabel={predictedClass}
          isOOD={isOOD}
        />
      </VStack>
      <VStack w={'100%'} maxH={'20%'} fontSize={'sm'} px={2} align={'space-between'}>
        <Text textAlign={'justify'}>
          Model predicts <strong>{predictedClass}</strong> with p ={' '}
          <strong>{predictedClassProb.toFixed(3)}</strong>.{' '}
          {aboveClassThreshold && givenEqualsSuggested && (
            <>
              This is above the {classPercentile}th class percentile for{' '}
              <strong>{predictedClass}</strong>. Thus, Cleanlab is confident that the label is{' '}
              <strong>{datapoint.givenLabel}</strong>.
            </>
          )}
          {aboveClassThreshold && !givenEqualsSuggested && (
            <>
              This is above the <strong>{classPercentile}th</strong> class percentile for{' '}
              {predictedClass}. Thus, Cleanlab is confident that the label is{' '}
              <strong>{predictedClass}</strong>.
            </>
          )}
          {isOOD && (
            <>
              This is below the <strong>{OODPercentile}th</strong> percentile for all classes and is
              considered out-of-distribution -- it is atypical and/or does not belong to any class.
            </>
          )}
          {!aboveClassThreshold && givenEqualsSuggested && !isOOD && (
            <>
              This is below the <strong>{classPercentile}th</strong> percentile class threshold for{' '}
              <strong>{predictedClass}s</strong>. Thus, Cleanlab agrees (with low confidence) that
              the given label is <strong>correct</strong>.
            </>
          )}
          {!aboveClassThreshold && !givenEqualsSuggested && !isOOD && (
            <>
              This is below the <strong>{classPercentile}th</strong> percentile class threshold for{' '}
              <strong>{predictedClass}s</strong>. Thus, Cleanlab infers (with low confidence) that
              the given label is <strong>incorrect</strong>.
            </>
          )}
        </Text>
      </VStack>
    </VStack>
  )
}

export default Explainer
