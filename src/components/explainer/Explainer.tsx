import React from 'react'
import { Box, Flex, HStack, Image, Tag, Text, VStack } from '@chakra-ui/react'
import { Datapoint, ImageWithLabelProps } from '../dataset/types'
import { LabelIssue } from '../results/types'
import { PredProbsEntryProps } from '../predProbs/types'

interface ExplainerProps {
  imageDataset: Record<string, Datapoint>
  predProbsData: Record<string, PredProbsEntryProps>
  thresholds: Record<string, number>
  classPercentile: number
  issues: Record<string, LabelIssue>
  OODData: Record<string, LabelIssue>
  activeImageId: string
}

const Explainer = (props: ExplainerProps) => {
  const {
    imageDataset,
    predProbsData,
    thresholds,
    classPercentile,
    issues,
    OODData,
    activeImageId,
  } = props
  if (!activeImageId) {
    return (
      <Flex height={'100%'} width={'100%'} justify={'center'} align={'center'}>
        <Text fontSize={'sm'} fontStyle={'italic'}>
          {/*Nothing to show.*/}
        </Text>
      </Flex>
    )
  }
  const predProbs = predProbsData[activeImageId]
  const isIssue = issues ? Object.keys(issues).includes(activeImageId) : false
  const issueEntry = issues[activeImageId]
  const isOOD = OODData ? Object.keys(OODData).includes(activeImageId) : false
  const OODEntry = OODData[activeImageId]
  const datapoint = imageDataset[activeImageId]
  console.log('isIssue', isIssue)
  console.log('isOOD', isOOD)
  console.log('activeImageId', activeImageId)
  console.log('Object.keys(OODData)', Object.keys(OODData))

  return (
    <HStack height={'100%'} width={'100%'} align={'center'} justify={'flex-start'}>
      <Image height={'100%'} src={datapoint.src} />
      <VStack align={'flex-start'}>
        <Tag colorScheme={'blue'} size={'md'}>
          Given label: {datapoint.givenLabel}
        </Tag>
        {isIssue && (
          <Tag colorScheme={'yellow'} size={'md'}>
            Suggested label: {issueEntry.suggestedLabel}
          </Tag>
        )}
        {isOOD && (
          <Tag colorScheme={'red'} size={'md'}>
            Out of distribution: This example does not belong to any of the 3 classes.
          </Tag>
        )}
      </VStack>
    </HStack>
  )
}

export default Explainer
