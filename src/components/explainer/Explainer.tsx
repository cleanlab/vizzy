import React from 'react'
import { chakra, Flex, HStack, Image, Tag, Text, VStack, Divider } from '@chakra-ui/react'
import { Datapoint, ImageWithLabelProps } from '../dataset/types'
import { LabelIssue } from '../results/types'
import { PredProbsEntryProps } from '../predProbs/types'
import util from '../../model/util'
import PercentileThresholds from './PercentileThresholds'

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
    <HStack height={'100%'} width={'100%'}>
      <Image height={'90%'} src={datapoint.src} />
      <VStack align={'center'} justify={'flex-start'} height={'100%'} width={'100%'}>
        <Text fontSize={'sm'}>
          The model predicts that is a <chakra.span fontWeight={600}>{predictedClass}</chakra.span>{' '}
          with probability{' '}
          <chakra.span fontWeight={600}>{predictedClassProb.toFixed(3)}</chakra.span>.
        </Text>
        <HStack spacing={'2rem'}>
          <HStack>
            <Tag colorScheme={'blue'} size={'sm'}>
              Given label
            </Tag>
            <Text fontSize={'sm'}>
              Either belongs to none of the 3 classes, or is an atypical example of one of the
              classes
            </Text>
          </HStack>

          {!isOOD && (
            <HStack>
              <Tag colorScheme={'yellow'} size={'sm'}>
                Suggested label
              </Tag>
              {isIssue && issueEntry && <Text fontSize={'sm'}>{issueEntry.suggestedLabel}</Text>}
              {!isIssue && <Text fontSize={'sm'}>{datapoint.givenLabel}</Text>}
            </HStack>
          )}
          {isOOD && OODEntry && (
            <HStack>
              <Tag colorScheme={'red'} size={'sm'}>
                Out of distribution
              </Tag>
              <Text fontSize={'sm'}>Does not belong to any of the 3 classes.</Text>
            </HStack>
          )}
        </HStack>
        <Divider />
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
    </HStack>
  )
}

export default Explainer
