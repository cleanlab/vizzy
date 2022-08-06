import React from 'react'
import {
  Box,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Text,
  Divider,
  HStack,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'

import { PredProbsEntryProps } from '../predProbs/types'
import { Datapoint } from '../dataset/types'
import { BsTriangleFill } from 'react-icons/bs'

interface ExplanationProps {
  datapoint: Datapoint
  classes: Array<string>
  predProbs: PredProbsEntryProps
  classPercentile: number
  classThresholds: Record<string, number>
  OODPercentile: number
  OODThresholds: Record<string, number>
  isOOD: boolean
  selectedClass: string
  showTooltip: boolean
  setShowTooltip: (boolean) => void
}

const ThresholdSlider = (props: ExplanationProps) => {
  const { predProbs, classes, classThresholds, OODThresholds, selectedClass, showTooltip } = props

  const predProbsClassMapping = classes.reduce((acc, class_, idx) => {
    acc[class_] = idx
    return acc
  }, {})

  const predictedClassProb = predProbs.probabilities[predProbsClassMapping[selectedClass]]
  const predictedClassThreshold = classThresholds[selectedClass]
  const predictedClassOODThreshold = OODThresholds[selectedClass]
  const OODColor = useColorModeValue('red.400', 'red.200')
  const confidentColor = useColorModeValue('blue.400', 'blue.200')

  console.log('predictedClassThreshold', { predictedClassThreshold, predictedClassOODThreshold })
  return (
    <HStack height={'100%'} width={'100%'} spacing={'1rem'} justify={'space-between'}>
      <Text fontSize={'sm'} fontWeight={500} width={'40px'}>
        {selectedClass}
      </Text>
      <Slider
        aria-label="slider-ex-6"
        max={1}
        height={'1px'}
        value={predictedClassProb}
        pl={'6px'}
        colorScheme="gray.200"
        _hover={{ cursor: 'unset' }}
        width={'100%'}
      >
        {/*<SliderMark*/}
        {/*  value={predictedClassOODThreshold}*/}
        {/*  textAlign="center"*/}
        {/*  mt="-6"*/}
        {/*  ml="-3"*/}
        {/*  fontSize={'xs'}*/}
        {/*>*/}
        {/*  {predictedClassOODThreshold.toFixed(3)}*/}
        {/*</SliderMark>*/}
        {/*<SliderMark value={predictedClassOODThreshold} textAlign="center" mt="-2">*/}
        {/*  <Box height="14px" width="2px" alignItems={'center'}>*/}
        {/*    <Divider size="40px" orientation="vertical" bg={'black'} />*/}
        {/*  </Box>*/}
        {/*</SliderMark>*/}

        <SliderMark
          value={predictedClassOODThreshold / 2}
          textColor={OODColor}
          fontWeight={700}
          textAlign="center"
          fontSize="xs"
          ml="-2"
          mt="2"
        >
          OOD
        </SliderMark>
        <SliderMark
          value={predictedClassThreshold + (1 - predictedClassThreshold) / 2}
          textColor={confidentColor}
          fontWeight={700}
          textAlign="center"
          fontSize="xs"
          ml="-2.5"
          mt="2"
        >
          class
        </SliderMark>

        <SliderMark
          value={predictedClassThreshold}
          textAlign="center"
          mt="-5"
          ml="-3"
          fontSize={'xs'}
          fontWeight={700}
          textColor={confidentColor}
        >
          {predictedClassThreshold.toFixed(3)}
        </SliderMark>
        <SliderMark
          value={predictedClassOODThreshold}
          textAlign="center"
          mt="-5"
          ml="-3"
          fontSize={'xs'}
          fontWeight={700}
          textColor={OODColor}
        >
          {predictedClassOODThreshold.toFixed(3)}
        </SliderMark>

        <SliderTrack bg="gray.400" height={'6px'}>
          <SliderFilledTrack
            width={`${predictedClassOODThreshold * 100}% !important`}
            bg={OODColor}
          />
          <SliderFilledTrack
            width={`${(1 - predictedClassThreshold) * 100}% !important`}
            left={'unset !important'}
            right={'0% !important'}
            bg={confidentColor}
          />
        </SliderTrack>

        <Tooltip
          hasArrow
          bg="teal.400"
          color="white"
          placement="top"
          fontSize="10"
          isOpen={showTooltip}
          label={predictedClassProb.toFixed(3)}
        >
          <SliderMark value={predictedClassProb} fontSize={'xs'} ml="2" />
        </Tooltip>
        <Flex>
          <SliderThumb
            as={BsTriangleFill}
            bg={'none'}
            boxShadow={'none'}
            transform={'translateY(-20%)'}
            borderRadius={'none'}
          />
        </Flex>
      </Slider>
    </HStack>
  )
}

export default ThresholdSlider
