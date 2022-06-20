import * as React from 'react'
import { useEffect, useState } from 'react'
import { Box, ChakraProvider, Heading, HStack, VStack } from '@chakra-ui/react'
import { theme } from './styles/theme'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DatasetInterface from './components/dataset/DatasetInterface'
import PredProbs from './components/predProbs/PredProbs'
import ConfidentJointMatrix from './components/confidentJoint/ConfidentJointMatrix'
import Results from './components/results/Results'
import OutOfDistribution from './components/ood/OutOfDistribution'
import SomeSlider from './components/sliders/Slider'
import { Datapoint } from './components/dataset/types'
import Explainer from './components/explainer/Explainer'
import { LabelIssue, LabelIssueImageProps } from './components/results/types'

export const App = () => {
  const [imageDataset, setImageDataset] = useState<Record<string, Datapoint>>(null)
  const [predProbsData, setPredProbsData] = useState([])
  const [confidentJointData, setConfidentJointData] = useState([])
  const [issues, setIssues] = useState<Array<LabelIssue>>(null)
  const [activeImageId, setActiveImageId] = useState(null)

  const updateDatasetLabel = (id, label) => {
    console.log(`updating label to ${label}`)
    setImageDataset({ ...imageDataset, [id]: { ...imageDataset[id], givenLabel: label } })
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://labelerrors.com/api/data?dataset=ImageNet&page=1&limit=300')
      const data = await res.json()
      const labelOptions = ['monkey', 'gorilla', 'chimp']
      const dataset = data.reduce((acc, e, idx) => {
        const id = `image-${idx}`
        acc[id] = {
          id: `image-${idx}`,
          src: `https://labelerrors.com/${e['path']}`,
          givenLabel: e['label'],
          labelOptions: labelOptions,
        }
        return acc
      }, {})
      setImageDataset(dataset)

      setIssues(
        data.slice(0, 30).map((e, idx) => {
          return {
            id: `image-${idx}`,
            src: `https://labelerrors.com/${e['path']}`,
            givenLabel: e['label'],
            suggestedLabel: 'kirby',
          }
        })
      )
    }
    fetchData()
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <VStack width={'100%'} height={'100%'}>
        <HStack justify={'flex-end'} width={'100%'}>
          {/*<Heading pl={4} fontSize={'md'}>*/}
          {/*  Cleanlab - Easy Vizzy*/}
          {/*</Heading>*/}
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
        <HStack width={'95%'} height={'90vh'}>
          <Box width={'20%'} height={'100%'}>
            <DatasetInterface data={imageDataset} updateLabel={updateDatasetLabel} />
          </Box>
          <VStack width={'60%'} height={'100%'}>
            <HStack width={'100%'} height={'80%'}>
              <Box width={'40%'} height={'100%'}>
                <PredProbs />
              </Box>
              <VStack width={'60%'} height={'100%'}>
                <SomeSlider />
                <SomeSlider />
                <ConfidentJointMatrix />
                <Box height={'20vh'} width={'100%'}>
                  <OutOfDistribution />
                </Box>
              </VStack>
            </HStack>
            <Box height={'20%'} width={'100%'}>
              <Explainer
                datapoint={imageDataset && activeImageId ? imageDataset[activeImageId] : null}
              />
            </Box>
          </VStack>
          <Box width={'20%'} height={'100%'}>
            <Results issues={issues} setActiveImageId={setActiveImageId} />
          </Box>
        </HStack>
      </VStack>
    </ChakraProvider>
  )
}
