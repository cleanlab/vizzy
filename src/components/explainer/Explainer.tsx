import React from 'react'
import { Box, Flex, HStack, Image, Tag, Text, VStack } from '@chakra-ui/react'
import { Datapoint } from '../dataset/types'
import { LabelIssue } from '../issues/types'
import { PredProbsEntryProps } from '../predProbs/types'
import util from '../../model/util'
import Explanation from './Explanation'
import BuiltBy from '../misc/BuiltBy'

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
      <VStack height={'100%'} width={'100%'}>
        <Flex height={'80%'} justify={'center'} align={'center'}>
          <Text fontSize={'sm'} fontStyle={'italic'}>
            Train the model and mouse over an image for more details!
          </Text>
        </Flex>
        <Flex align={'flex-end'} h={'20%'} justify={'flex-end'} w={'100%'}>
          <BuiltBy />
        </Flex>
      </VStack>
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

  return (
    <VStack height={'100%'} width={'100%'} align={'space-between'} spacing={'1rem'}>
      <VStack w={'20%'} height={'100%'} align={'center'} spacing={1}>
        <Image h={'90%'} src={datapoint.src} />
        <HStack spacing={'0.75rem'} justify={'center'} width={'100%'}>
          <Tag colorScheme={'blue'} size={'md'}>
            Given: {datapoint.givenLabel}
          </Tag>

          {!isOOD && (
            <Tag colorScheme={'yellow'} size={'md'}>
              Suggested: {isIssue && issueEntry && issueEntry.suggestedLabel}
              {!isIssue && datapoint.givenLabel}
            </Tag>
          )}
          {isOOD && OODEntry && (
            <Tag colorScheme={'red'} size={'md'}>
              Out of distribution
            </Tag>
          )}
        </HStack>
      </VStack>
      <VStack w={'36%'} h={'100%'} fontSize={'md'} pl={4} align={'space-between'}>
        <Box h={'100%'}>
          <Text>
            For this image, the model predicts label <strong>{predictedClass}</strong> with
            probability <strong>{predictedClassProb.toFixed(3)}</strong>.
          </Text>
          <br />
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
        </Box>
      </VStack>
    </VStack>
  )
}

export default Explainer
