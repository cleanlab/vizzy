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
} from '@chakra-ui/react'

import { PredProbsEntryProps } from '../predProbs/types'
import { Datapoint } from '../dataset/types'

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
}

const ThresholdSlider = (props: ExplanationProps) => {
  const { predProbs, classThresholds, OODThresholds, selectedClass } = props

  const predProbsClassMapping = { cat: 0, dog: 1, bear: 2 } // TODO: make this dynamic
  const predictedClassProb = predProbs.probabilities[predProbsClassMapping[selectedClass]]
  const predictedClassThreshold = classThresholds[selectedClass]
  const predictedClassOODThreshold = OODThresholds[selectedClass]

  return (
    <HStack height={'100%'} width={'85%'} spacing={'1rem'}>
      <Text fontSize="14" fontWeight={500}>
        {selectedClass}
      </Text>
      {selectedClass && (
        <Slider
          aria-label="slider-ex-6"
          max={1}
          value={predictedClassProb}
          colorScheme="gray.600"
          width={'90%'}
        >
          <SliderMark value={predictedClassProb} />
          <SliderMark
            value={predictedClassOODThreshold}
            textAlign="center"
            mt="-6"
            ml="-3"
            fontSize={'xs'}
          >
            {predictedClassOODThreshold.toFixed(3)}
          </SliderMark>
          <SliderMark value={predictedClassOODThreshold} textAlign="center" mt="-2">
            <Box height="14px" width="4px" alignItems={'center'}>
              <Divider size="40px" orientation="vertical" bg={'gray.800'} />
            </Box>
          </SliderMark>

          <SliderMark
            value={predictedClassOODThreshold}
            textAlign="center"
            fontSize="xs"
            ml="-2"
            mt="2.5"
          >
            OOD
          </SliderMark>
          <SliderMark
            value={predictedClassThreshold}
            textAlign="center"
            mt="-6"
            ml="-3"
            fontSize={'xs'}
          >
            {predictedClassThreshold.toFixed(3)}
          </SliderMark>

          <SliderMark value={predictedClassThreshold} textAlign="center" mt="-2">
            <Box height="14px" width="4px">
              <Divider size="40px" orientation="vertical" bg={'gray.800'} />
            </Box>
          </SliderMark>
          <SliderMark
            value={predictedClassThreshold}
            textAlign="center"
            fontSize={'xs'}
            ml="-2.5"
            mt="1.5"
          >
            class
          </SliderMark>
          <SliderTrack bg="gray.500">
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="teal.400"
            color="white"
            placement="top"
            fontSize="10"
            isOpen={true}
            label={predictedClassProb.toFixed(3)}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      )}
    </HStack>
  )
}

export default ThresholdSlider
