import * as React from 'react'
import { useEffect, useState } from 'react'
import { Box, ChakraProvider, Divider, Heading, HStack, VStack } from '@chakra-ui/react'
import { theme } from './styles/theme'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DatasetInterface from './components/dataset/DatasetInterface'
import PredProbs from './components/predProbs/PredProbs'
import ConfidentJointMatrix from './components/confidentJoint/ConfidentJointMatrix'
import Results from './components/results/Results'
import OutOfDistribution from './components/ood/OutOfDistribution'
import { Datapoint } from './components/dataset/types'
import Explainer from './components/explainer/Explainer'
import { LabelIssue, LabelIssueImageProps } from './components/results/types'
import { PredProbsEntryProps } from './components/predProbs/types'
import Thresholds from './components/predProbs/Thresholds'

import util from './model/util'

const CLASSES = ['mouse', 'cat', 'dog']

export const App = () => {
  const [imageDataset, setImageDataset] = useState<Record<string, Datapoint>>(null)
  const [predProbsData, setPredProbsData] = useState<Record<string, PredProbsEntryProps>>(null)
  const [thresholds, setThresholds] = useState<Record<string, number>>({
    dog: 0,
    cat: 0,
    mouse: 0,
  })
  const [confidentJointData, setConfidentJointData] = useState([])
  const [issues, setIssues] = useState<Record<string, LabelIssue>>(null)
  const [OODData, setOODData] = useState<Record<string, LabelIssue>>(null)
  const [activeImageId, setActiveImageId] = useState(null)
  const [classPercentile, setClassPercentile] = useState(50)

  const updateDatasetLabel = (id, label) => {
    console.log(`updating label to ${label}`)
    setImageDataset({ ...imageDataset, [id]: { ...imageDataset[id], givenLabel: label } })
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://labelerrors.com/api/data?dataset=ImageNet&page=1&limit=300')
      const data = await res.json()
      const labelOptions = CLASSES
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

      setPredProbsData(
        data.reduce((acc, e, idx) => {
          const id = `image-${idx}`
          acc[id] = {
            id,
            src: `https://labelerrors.com/${e['path']}`,
            probabilities: [...Array(3)].map((e) => Math.random().toFixed(3)),
          }
          return acc
        }, {})
      )

      setIssues(
        data.slice(0, 30).reduce((acc, e, idx) => {
          const id = `image-${idx}`
          acc[id] = {
            id,
            src: `https://labelerrors.com/${e['path']}`,
            givenLabel: e['label'],
            suggestedLabel: 'kirby',
          }
          return acc
        }, {})
      )

      setOODData(
        data.slice(30, 60).reduce((acc, e, idx) => {
          const id = `image-${30 + idx}`
          acc[id] = {
            id: `image-${30 + idx}`,
            src: `https://labelerrors.com/${e['path']}`,
            givenLabel: e['label'],
            suggestedLabel: 'kirby',
          }
          return acc
        }, {})
      )
    }
    fetchData()
  }, [])

  // compute class thresholds
  useEffect(() => {
    if (predProbsData) {
      const thresholds = util.computeClassThresholds(predProbsData, CLASSES, classPercentile)
      setThresholds(thresholds)
    }
  }, [predProbsData, classPercentile, setThresholds])

  return (
    <ChakraProvider theme={theme}>
      <VStack width={'100%'} height={'100%'}>
        <HStack justify={'flex-end'} width={'100%'}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
        <HStack width={'95%'} height={'90vh'}>
          <Box width={'20%'} height={'100%'}>
            <DatasetInterface data={imageDataset} updateLabel={updateDatasetLabel} />
          </Box>
          <VStack width={'60%'} height={'100%'}>
            <HStack width={'100%'} height={'70%'} align={'space-between'}>
              <VStack width={'40%'} height={'100%'} spacing={'0rem'}>
                <Box height={'85%'}>
                  <PredProbs
                    data={predProbsData}
                    classPercentile={classPercentile}
                    setClassPercentile={setClassPercentile}
                    setActiveImageId={setActiveImageId}
                  />
                </Box>
                <Box height={'20%'}>
                  <Thresholds thresholds={thresholds} />
                </Box>
              </VStack>
              <ConfidentJointMatrix issues={issues} />
            </HStack>
            <Divider />
            <Box height={'20%'} width={'100%'}>
              <Explainer
                imageDataset={imageDataset}
                predProbsData={predProbsData}
                thresholds={thresholds}
                issues={issues}
                OODData={OODData}
                classPercentile={classPercentile}
                activeImageId={activeImageId}
              />
            </Box>
          </VStack>

          <VStack width={'20%'} height={'100%'}>
            <Box height={'60%'} width={'100%'}>
              <Results issues={issues} setActiveImageId={setActiveImageId} />
            </Box>
            <Box height={'40%'} width={'100%'}>
              <OutOfDistribution issues={OODData} setActiveImageId={setActiveImageId} />
            </Box>
          </VStack>
        </HStack>
      </VStack>
    </ChakraProvider>
  )
}
