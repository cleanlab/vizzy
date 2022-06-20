import React, { useState } from 'react'
import {
  Box,
  HStack,
  VStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'

interface PercentileSliderProps {
  percentile: number
  setPercentile: (number) => void
}

const PercentileSlider = (props: PercentileSliderProps) => {
  const { percentile, setPercentile } = props

  return (
    <VStack align={'flex-start'}>
      <Text fontSize={'sm'}>Percentile threshold: {percentile}</Text>
      <Slider
        value={percentile}
        min={0}
        max={100}
        step={5}
        onChange={(value) => setPercentile(value)}
      >
        <SliderTrack>
          <Box position="relative" right={10} />
          <SliderFilledTrack bgColor={'teal'} />
        </SliderTrack>
        <SliderThumb boxSize={4} color={'black'} bgColor={'teal'} />
      </Slider>
    </VStack>
  )
}

export default PercentileSlider
