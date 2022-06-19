import * as React from 'react'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  HStack,
  Container,
  Flex,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'
import DatasetInterface from './components/dataset/DatasetInterface'
import PredProbs from './components/predProbs/PredProbs'
import ConfidentJointMatrix from './components/confidentJoint/ConfidentJointMatrix'
import Results from './components/results/Results'
import OutOfDistribution from './components/ood/OutOfDistribution'
import SomeSlider from './components/sliders/Slider'

export const App = () => {
  const getFilterFunc = (data, func) => {
    return data.filter(func)
  }

  return (
    <ChakraProvider theme={theme}>
      <VStack width={'100%'} height={'100%'}>
        <Flex justify={'flex-end'} width={'100%'}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
        <HStack width={'90%'} height={'90vh'}>
          <VStack width={'20%'} height={'100%'}>
            <DatasetInterface />
            <SomeSlider />
          </VStack>
          <Box width={'25%'} height={'100%'}>
            <PredProbs />
          </Box>
          <VStack width={'35%'} height={'100%'}>
            <SomeSlider />
            <SomeSlider />
            <ConfidentJointMatrix />
            <Box height={'20vh'} width={'100%'}>
              <OutOfDistribution />
            </Box>
          </VStack>
          <Box width={'20%'} height={'100%'}>
            <Results />
          </Box>
        </HStack>
      </VStack>
    </ChakraProvider>
  )
}
