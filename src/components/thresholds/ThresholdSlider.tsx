import React from 'react'
import {
  Box,
  Flex,
  HStack,
  Image,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'

import { PredProbsEntryProps } from '../predProbs/types'
import { Datapoint } from '../dataset/types'
import { BsTriangleFill } from 'react-icons/bs'

interface ThresholdSliderProps {
  datapoint: Datapoint
  predProbs: PredProbsEntryProps
  classes: Array<string>
  classPercentile: number
  classThresholds: Record<string, number>
  OODPercentile: number
  OODThresholds: Record<string, number>
  selectedClass: string
  showTooltip: boolean
  setShowTooltip: (boolean) => void
}

const ThresholdSlider = (props: ThresholdSliderProps) => {
  const {
    datapoint,
    predProbs,
    classes,
    classThresholds,
    OODThresholds,
    selectedClass,
    showTooltip,
  } = props

  const thresholdsReady = Object.values(classThresholds).reduce((a, b) => a + b) !== 0
  const predProbsClassMapping = classes.reduce((acc, class_, idx) => {
    acc[class_] = idx
    return acc
  }, {})

  const predictedClassProb = predProbs
    ? predProbs.probabilities[predProbsClassMapping[selectedClass]]
    : undefined
  const predictedClassThreshold = classThresholds[selectedClass]
  const predictedClassOODThreshold = OODThresholds[selectedClass]
  const OODColor = useColorModeValue('orange.400', 'orange.200')
  const confidentColor = useColorModeValue('blue.400', 'blue.200')

  return (
    <HStack height={'100%'} w={'100%'} spacing={'1rem'} justify={'space-between'}>
      {/*<Flex w={'5%'} h={'100%'} align={'center'}>*/}
      <Text fontSize={'sm'} fontWeight={500} width={'40px'}>
        {selectedClass}
      </Text>
      {/*</Flex>*/}
      <Flex w={'90%'} h={'100%'} align={'center'}>
        <Slider
          aria-label="slider-ex-6"
          max={1}
          height={'1px'}
          value={predictedClassProb}
          colorScheme="gray.200"
          _hover={{cursor: 'unset'}}
          width={'100%'}
        >
          {/*{!thresholdsReady && <SliderThumb />}*/}
          {thresholdsReady && (
            <>
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

              {predictedClassProb && (
                <Tooltip
                  hasArrow
                  bg="teal.400"
                  color="white"
                  placement="top"
                  fontSize="10"
                  isOpen={showTooltip}
                  label={predictedClassProb.toFixed(3)}
                >
                  <SliderMark value={predictedClassProb} fontSize={'xs'}/>
                </Tooltip>
              )}
              {datapoint && (
                <SliderThumb
                  bg={'none'}
                  boxShadow={'none !important'}
                  outline={'none !important'}
                  transform={'translateY(50%)'}
                  borderRadius={'none'}
                  ml={'-2'} // TODO hacky
                >
                  <Box>
                    <Box as={BsTriangleFill} fontSize="0.8em"/>
                    <Image src={datapoint.src} rounded="md"/>
                  </Box>
                </SliderThumb>
              )}
            </>
          )}
        </Slider>
      </Flex>
    </HStack>
  )
}

export default ThresholdSlider
