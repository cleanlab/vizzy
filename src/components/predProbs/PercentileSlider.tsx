import React from 'react'
import {
  Box,
  VStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'

interface PercentileSliderProps {
  name: string
  percentile: number
  setPercentile: (number) => void
}

const PercentileSlider = (props: PercentileSliderProps) => {
  const { name, percentile, setPercentile } = props

  return (
    <VStack align={'flex-start'} width={'100%'}>
      <Text fontSize={'sm'}>
        {name}: {percentile}
      </Text>
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
