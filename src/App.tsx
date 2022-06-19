import * as React from 'react'
import { useEffect, useState } from 'react'
import { Box, ChakraProvider, Heading, HStack, theme, VStack } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DatasetInterface from './components/dataset/DatasetInterface'
import PredProbs from './components/predProbs/PredProbs'
import ConfidentJointMatrix from './components/confidentJoint/ConfidentJointMatrix'
import Results from './components/results/Results'
import OutOfDistribution from './components/ood/OutOfDistribution'
import SomeSlider from './components/sliders/Slider'

export const App = () => {
  const [imageDataset, setImageDataset] = useState(null)
  const [predProbsData, setPredProbsData] = useState([])
  const [confidentJointData, setConfidentJointData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://labelerrors.com/api/data?dataset=ImageNet&page=1&limit=1000')
      const data = res.json()
      setImageDataset(data)
    }
    fetchData()
  })

  return (
    <ChakraProvider theme={theme}>
      <VStack width={'100%'} height={'100%'}>
        <HStack justify={'space-between'} width={'100%'}>
          <Heading pl={4} fontSize={'md'}>
            Cleanlab - Easy Vizzy
          </Heading>
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
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
