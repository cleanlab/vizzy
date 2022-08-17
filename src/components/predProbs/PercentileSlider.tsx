import React from 'react'
import {
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

interface PercentileSliderProps {
  name: string
  percentile: number
  setPercentile: (number) => void
}

const PercentileSlider = (props: PercentileSliderProps) => {
  const { name, percentile, setPercentile } = props
  const OODColor = useColorModeValue('orange.400', 'orange.200')
  const confidentColor = useColorModeValue('blue.400', 'blue.200')

  return (
    <VStack align={'flex-start'} width={'100%'}>
      <HStack w={'100%'} fontSize={'sm'} justify={'space-between'}>
        <Text>{name}</Text>
        <Text>{percentile}</Text>
      </HStack>
      <Slider
        min={0}
        max={100}
        step={5}
        value={percentile}
        onChange={(value) => setPercentile(value)}
      >
        <SliderTrack h={'4px'}>
          <SliderFilledTrack
            bgColor={name === 'Out-of-distribution percentile' ? OODColor : confidentColor}
          />
        </SliderTrack>
        <SliderThumb
          outline={'none !important'}
          boxShadow={'none !important'}
          boxSize={3}
          bgColor={name === 'Out-of-distribution percentile' ? OODColor : confidentColor}
        />
      </Slider>
    </VStack>
  )
}

export default PercentileSlider
