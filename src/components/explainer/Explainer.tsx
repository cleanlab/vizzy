import React from 'react'
import { Flex, Image, Text, VStack } from '@chakra-ui/react'
import { Datapoint } from '../dataset/types'
import { LabelIssue } from '../issues/types'
import { PredProbsEntryProps } from '../predProbs/types'
import util from '../../model/util'
import Explanation from './Explanation'

interface ExplainerProps {
  imageDataset: Record<string, Datapoint>
  predProbsData: Record<string, PredProbsEntryProps>
  classThresholds: Record<string, number>
  OODThresholds: Record<string, number>
  classes: Array<string>
  classPercentile: number
  OODPercentile: number
  issues: Record<string, LabelIssue>
  OODData: Record<string, LabelIssue>
  activeImageId: string
}

const Explainer = (props: ExplainerProps) => {
  const {
    imageDataset,
    predProbsData,
    classThresholds,
    OODThresholds,
    classes,
    classPercentile,
    OODPercentile,
    issues,
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
  const isIssue = issues ? Object.keys(issues).includes(activeImageId) : false
  const issueEntry = issues ? issues[activeImageId] : null
  const isOOD = OODData ? Object.keys(OODData).includes(activeImageId) : false
  const OODEntry = OODData ? OODData[activeImageId] : null
  const datapoint = imageDataset[activeImageId]
  const predictedClassThreshold = classThresholds[predictedClass]
  const aboveClassThreshold = predictedClassProb > predictedClassThreshold
  const givenEqualsSuggested = predictedClass === datapoint.givenLabel

  return (
    <VStack height={'fit-content'} width={'100%'} align={'space-between'} px={1}>
      <VStack w={'100%'} align={'center'} spacing={1}>
        <Image src={datapoint.src} />
        {/*<HStack spacing={'0.75rem'} justify={'center'} width={'100%'}>*/}
        {/*  <Tag colorScheme={'blue'} size={'md'}>*/}
        {/*    Given: {datapoint.givenLabel}*/}
        {/*  </Tag>*/}

        {/*  {!isOOD && (*/}
        {/*    <Tag colorScheme={'yellow'} size={'md'}>*/}
        {/*      Suggested: {isIssue && issueEntry && issueEntry.suggestedLabel}*/}
        {/*      {!isIssue && datapoint.givenLabel}*/}
        {/*    </Tag>*/}
        {/*  )}*/}
        {/*  {isOOD && OODEntry && (*/}
        {/*    <Tag colorScheme={'red'} size={'md'}>*/}
        {/*      Out-of-distribution*/}
        {/*    </Tag>*/}
        {/*  )}*/}
        {/*</HStack>*/}
      </VStack>
      <VStack w={'100%'} fontSize={'sm'} px={2} align={'space-between'}>
        <Text>
          Model predicts <strong>{predictedClass}</strong> with p ={' '}
          <strong>{predictedClassProb.toFixed(3)}</strong>.{' '}
          {aboveClassThreshold && givenEqualsSuggested && (
            <>
              This is above the <strong>{classPercentile}th</strong> percentile class threshold for{' '}
              <strong>{predictedClass}</strong>.
            </>
          )}
          {aboveClassThreshold && !givenEqualsSuggested && (
            <>
              This is above the <strong>{classPercentile}th</strong> percentile class threshold for{' '}
              <strong>{predictedClass}s</strong>.
            </>
          )}
          {isOOD && (
            <>
              Each predicted probability is below the respective <strong>{OODPercentile}th</strong>{' '}
              percentile out-of-distribution thresholds.
            </>
          )}
          {!aboveClassThreshold && givenEqualsSuggested && !isOOD && (
            <>
              This is below the <strong>{classPercentile}th</strong> percentile class threshold for{' '}
              <strong>{predictedClass}s</strong>.
            </>
          )}
          {!aboveClassThreshold && !givenEqualsSuggested && !isOOD && (
            <>
              This is below the <strong>{classPercentile}th</strong> percentile class threshold for{' '}
              <strong>{predictedClass}s</strong>
            </>
          )}
        </Text>

        <Explanation
          datapoint={datapoint}
          classes={classes}
          predProbs={predProbs}
          classPercentile={classPercentile}
          classThresholds={classThresholds}
          OODPercentile={OODPercentile}
          OODThresholds={OODThresholds}
          isOOD={isOOD}
        />
      </VStack>
    </VStack>
  )
}

export default Explainer
