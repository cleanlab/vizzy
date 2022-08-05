import React from 'react'
import {
  Box,
  chakra,
  Flex,
  HStack,
  Image,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { Datapoint } from '../dataset/types'
import { LabelIssue } from '../results/types'
import { PredProbsEntryProps } from '../predProbs/types'
import util from '../../model/util'
import PercentileThresholds from './PercentileThresholds'
import Explanation from './Explanation'
import PercentileSlider from '../predProbs/PercentileSlider'
import BuiltBy from '../misc/BuiltBy'

interface ExplainerProps {
  imageDataset: Record<string, Datapoint>
  predProbsData: Record<string, PredProbsEntryProps>
  classThresholds: Record<string, number>
  OODThresholds: Record<string, number>
  classes: Array<string>
  classPercentile: number
  setClassPercentile: (number) => void
  OODPercentile: number
  setOODPercentile: (number) => void
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
    setClassPercentile,
    OODPercentile,
    setOODPercentile,
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
    <HStack
      height={'100%'}
      width={'100%'}
      align={'flex-start'}
      spacing={'1rem'}
      // p={3}
      // bgColor={'green.50'}
      // rounded={'md'}
    >
      <VStack w={'16%'} height={'100%'} align={'flex-start'}>
        <Image h={'100%'} src={datapoint.src} />
        <HStack spacing={'0.75rem'} align={'flex-start'} width={'100%'}>
          <Tag colorScheme={'blue'} size={'sm'}>
            Given: {datapoint.givenLabel}
          </Tag>

          {!isOOD && (
            <Tag colorScheme={'yellow'} size={'sm'}>
              Suggested: {isIssue && issueEntry && issueEntry.suggestedLabel}
              {!isIssue && datapoint.givenLabel}
            </Tag>
          )}
          {isOOD && OODEntry && (
            <Tag colorScheme={'red'} size={'sm'}>
              Out of distribution
            </Tag>
          )}
        </HStack>
      </VStack>

      <VStack height={'20%'} width={'44%'} align={'flex-start'}>
        <HStack width={'100%'}>
          <Box
            width={'50%'}
            borderWidth={'2px'}
            borderColor={'teal.400'}
            borderRadius={'lg'}
            padding={'10px'}
          >
            <PercentileSlider
              name={'Class percentile'}
              percentile={classPercentile}
              setPercentile={setClassPercentile}
            />
          </Box>
          <Box
            width={'50%'}
            borderWidth={'2px'}
            borderColor={'teal.400'}
            borderRadius={'lg'}
            padding={'10px'}
          >
            <PercentileSlider
              name={'Out-of-distribution percentile'}
              percentile={OODPercentile}
              setPercentile={setOODPercentile}
            />
          </Box>
        </HStack>

        <br />
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
      <Box w={'40%'} fontSize={'md'} pl={4}>
        <Text>
          For this image, the model predicts label{' '}
          <chakra.span fontWeight={600}>{predictedClass}</chakra.span> with probability{' '}
          <chakra.span fontWeight={600}>{predictedClassProb.toFixed(3)}</chakra.span>.
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
        <BuiltBy />
      </Box>
    </HStack>
  )
}

export default Explainer
