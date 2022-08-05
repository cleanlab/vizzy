import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  ChakraProvider,
  Divider,
  HStack,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { theme } from './styles/theme'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DatasetInterface from './components/dataset/DatasetInterface'
import PredProbs from './components/predProbs/PredProbs'
import ConfidentJoint from './components/confidentJoint/ConfidentJoint'
import Results from './components/results/Results'
import OutOfDistribution from './components/ood/OutOfDistribution'
import { Datapoint } from './components/dataset/types'
import Explainer from './components/explainer/Explainer'
import { LabelIssue } from './components/results/types'
import { PredProbsEntryProps } from './components/predProbs/types'

import util from './model/util'

const CLASSES = ['cat', 'dog', 'bear']

export const App = () => {
  const [imageDataset, setImageDataset] = useState<Record<string, Datapoint>>(null)
  const [predProbsData, setPredProbsData] = useState<Record<string, PredProbsEntryProps>>(null)
  const [classThresholds, setClassThresholds] = useState<Record<string, number>>(
    CLASSES.reduce((acc, elt) => {
      acc[elt] = 0
      return acc
    }, {})
  )
  const [OODThresholds, setOODThresholds] = useState<Record<string, number>>(
    CLASSES.reduce((acc, elt) => {
      acc[elt] = 0
      return acc
    }, {})
  )
  const [confidentJointData, setConfidentJointData] = useState<Record<string, LabelIssue>>(null)
  const [issues, setIssues] = useState<Record<string, LabelIssue>>(null)
  const [OODData, setOODData] = useState<Record<string, LabelIssue>>(null)
  const [activeImageId, setActiveImageId] = useState(null)
  const [classPercentile, setClassPercentile] = useState(50)
  const [OODPercentile, setOODPercentile] = useState(10)
  const embeddings: Record<string, Datapoint> = require('./model/embeddings_32.json')

  const updateDatasetLabel = (id, label) => {
    setImageDataset({ ...imageDataset, [id]: { ...imageDataset[id], givenLabel: label } })
  }

  // load all data
  useEffect(() => {
    if (embeddings) {
      const dataset = Object.entries(embeddings).reduce((acc, [id, datapoint]) => {
        acc[id] = {
          ...datapoint,
          src: `https://labelerrors.com/static/imagenet/val/${datapoint.src}`,
        }
        return acc
      }, {})
      setImageDataset(dataset)
    }
  }, [embeddings])

  const populatePredProbs = async () => {
    const predProbs = await util.computePredProbs(imageDataset, CLASSES)
    setPredProbsData(predProbs)
  }

  // compute class thresholds
  useEffect(() => {
    if (predProbsData) {
      const classThresholds_ = util.computeClassThresholds(predProbsData, CLASSES, classPercentile)
      setClassThresholds(classThresholds_)

      const OODThresholds_ = util.computeClassThresholds(predProbsData, CLASSES, OODPercentile)
      setOODThresholds(OODThresholds_)
      const cjData = util.constructConfidentJoint(
        predProbsData,
        CLASSES,
        classThresholds_,
        OODThresholds_
      )
      setConfidentJointData(cjData)
      setIssues(
        Object.keys(cjData).reduce((acc, id) => {
          const datapoint = cjData[id]
          if (datapoint.suggestedLabel && datapoint.givenLabel !== datapoint.suggestedLabel) {
            acc[id] = cjData[id]
          }
          return acc
        }, {})
      )
      setOODData(
        Object.keys(cjData).reduce((acc, id) => {
          const datapoint = cjData[id]
          if (datapoint.OOD) {
            acc[id] = cjData[id]
          }
          return acc
        }, {})
      )
    }
  }, [predProbsData, classPercentile, setClassThresholds, OODPercentile, setOODThresholds])

  return (
    <ChakraProvider theme={theme}>
      <VStack width={'100%'} height={'100%'} spacing={0} minWidth={'1440px'}>
        <HStack justify={'flex-end'} width={'100%'} spacing={1}>
          <Button variant={'ghost'}>Guide</Button>
          <Button variant={'ghost'}>Blog</Button>
          {/*<Button variant={'ghost'}>Cleanlab</Button>*/}
          <Button variant={'ghost'}>GitHub</Button>
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
        <Stack w={'95%'} height={'93vh'} direction={'row'} spacing={4} justify={'space-between'}>
          <Box width={'15%'} height={'100%'}>
            <DatasetInterface
              data={imageDataset}
              classes={CLASSES}
              updateLabel={updateDatasetLabel}
            />
          </Box>
          <VStack w={'85%'} justify={'space-between'} align={'space-between'} h={'100%'}>
            <Stack width={'100%'} height={'70%'} align={'space-between'} direction={'row'}>
              <Box height={'100%'} width={'22%'}>
                <PredProbs
                  data={predProbsData}
                  classes={CLASSES}
                  setActiveImageId={setActiveImageId}
                  populatePredProbs={populatePredProbs}
                />
              </Box>
              <Box w={'50%'}>
                <ConfidentJoint
                  labels={CLASSES}
                  issues={confidentJointData}
                  activeImageId={activeImageId}
                  setActiveImageId={setActiveImageId}
                />
              </Box>
              <VStack
                w={'25%'}
                height={'100%'}
                pt={5}
                bgColor={useColorModeValue('purple.50', 'purple.900')}
                p={2}
                rounded={'md'}
              >
                <Box height={'50%'} width={'100%'}>
                  <Results
                    issues={issues}
                    activeImageId={activeImageId}
                    setActiveImageId={setActiveImageId}
                  />
                </Box>
                <Box height={'50%'} width={'100%'}>
                  <OutOfDistribution
                    issues={OODData}
                    activeImageId={activeImageId}
                    setActiveImageId={setActiveImageId}
                  />
                </Box>
              </VStack>
            </Stack>

            <Box height={'30%'} width={'100%'}>
              <Explainer
                imageDataset={imageDataset}
                predProbsData={predProbsData}
                classes={CLASSES}
                classThresholds={classThresholds}
                OODThresholds={OODThresholds}
                issues={issues}
                OODData={OODData}
                classPercentile={classPercentile}
                setClassPercentile={setClassPercentile}
                OODPercentile={OODPercentile}
                setOODPercentile={setOODPercentile}
                activeImageId={activeImageId}
              />
            </Box>
          </VStack>
        </Stack>
      </VStack>
    </ChakraProvider>
  )
}
