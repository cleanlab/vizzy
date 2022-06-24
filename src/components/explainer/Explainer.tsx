import React from 'react'
import { chakra, Flex, HStack, Image, Tag, Text, VStack, Divider, Box } from '@chakra-ui/react'
import { Datapoint, ImageWithLabelProps } from '../dataset/types'
import { LabelIssue } from '../results/types'
import { PredProbsEntryProps } from '../predProbs/types'
import util from '../../model/util'
import PercentileThresholds from './PercentileThresholds'
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
      <Flex height={'100%'} width={'100%'} justify={'center'} align={'center'}>
        <Text fontSize={'sm'} fontStyle={'italic'}>
          {/*Nothing to show.*/}
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

  return (
    <HStack height={'100%'} width={'100%'} align={'flex-start'} spacing={'1rem'}>
      <VStack width={'30%'} height={'100%'}>
        <Image height={'95%'} src={datapoint.src} />

        <HStack spacing={'1rem'} align={'flex-start'} width={'100%'}>
          <HStack>
            <Tag colorScheme={'blue'} size={'sm'}>
              Given
            </Tag>
            <Text fontSize={'sm'}>{datapoint.givenLabel}</Text>
          </HStack>

          {!isOOD && (
            <HStack>
              <Tag colorScheme={'yellow'} size={'sm'}>
                Suggested
              </Tag>
              {isIssue && issueEntry && <Text fontSize={'sm'}>{issueEntry.suggestedLabel}</Text>}
              {!isIssue && <Text fontSize={'sm'}>{datapoint.givenLabel}</Text>}
            </HStack>
          )}
          {isOOD && OODEntry && (
            <Tag colorScheme={'red'} size={'sm'}>
              Out of distribution
            </Tag>
          )}
        </HStack>
      </VStack>

      <VStack align={'space-between'} justify={'space-between'} width={'100%'}>
        <Text fontSize={'sm'}>
          The model predicts that is a <chakra.span fontWeight={600}>{predictedClass}</chakra.span>{' '}
          with probability{' '}
          <chakra.span fontWeight={600}>{predictedClassProb.toFixed(3)}</chakra.span>.
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
        <br />
        <VStack height={'20%'} width={'100%'} align={'flex-start'}>
          <PercentileThresholds
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
    </HStack>
  )
}

export default Explainer
