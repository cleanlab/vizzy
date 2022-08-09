import React from 'react'
import { Box, Flex, HStack, Image, Tag, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { Datapoint } from '../dataset/types'
import { LabelIssue } from '../issues/types'
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

  const OODColor = useColorModeValue('red.400', 'red.200')
  const confidentColor = useColorModeValue('blue.400', 'blue.200')

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
    <HStack height={'100%'} width={'100%'} align={'space-between'} spacing={'1rem'}>
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

      <VStack height={'20%'} width={'42%'} align={'flex-start'}>
        <HStack width={'100%'}>
          <Box
            width={'50%'}
            borderWidth={'1px'}
            borderColor={OODColor}
            borderRadius={'lg'}
            padding={'10px'}
          >
            <PercentileSlider
              name={'Out-of-distribution percentile'}
              percentile={OODPercentile}
              setPercentile={setOODPercentile}
            />
          </Box>
          <Box
            width={'50%'}
            borderWidth={'1px'}
            borderColor={confidentColor}
            borderRadius={'lg'}
            padding={'10px'}
          >
            <PercentileSlider
              name={'Class percentile'}
              percentile={classPercentile}
              setPercentile={setClassPercentile}
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
        <Flex>
          <BuiltBy />
        </Flex>
      </VStack>
    </HStack>
  )
}

export default Explainer
