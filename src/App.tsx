import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, ChakraProvider, HStack, VStack } from '@chakra-ui/react'
import { theme } from './styles/theme'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DatasetInterface from './components/dataset/DatasetInterface'
import PredProbs from './components/predProbs/PredProbs'
import ConfidentJoint from './components/confidentJoint/ConfidentJoint'
import { Datapoint } from './components/dataset/types'
import { LabelIssue } from './components/issues/types'
import { PredProbsEntryProps } from './components/predProbs/types'

import util from './model/util'
import Results from './components/results/Results'
import TourWrapper from './components/tour/TourWrapper'
import PercentileThresholds from './components/thresholds/PercentileThresholds'
import BuiltBy from './components/misc/BuiltBy'
import Explainer from './components/explainer/Explainer'

const CLASSES = ['cat', 'dog', 'bear']
const Embeddings: Record<string, Datapoint> = require('./model/output_data_embeddings_32.json')
const Dataset: Record<string, Datapoint> = Object.entries(Embeddings).reduce(
  (acc, [id, datapoint]) => {
    acc[id] = {
      ...datapoint,
      src: `https://labelerrors.com/static/imagenet/val/${datapoint.src}`,
    }
    return acc
  },
  {}
)

const doNothing = (id: string) => null

export const App = () => {
  const [imageDataset, setImageDataset] = useState<Record<string, Datapoint>>(Dataset)
  const [submittedDataset, setSubmittedDataset] = useState<Record<string, Datapoint>>(Dataset)
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
  const [OODPercentile, setOODPercentile] = useState(15)
  const [percentiles, setPercentiles] = useState(null)
  const [miniTourEnabled, setMiniTourEnabled] = useState<boolean>(false)
  const [tourEnabled, setTourEnabled] = useState<boolean>(false)
  // track whether labels have changed since training
  const [labelsChanged, setLabelsChanged] = useState(true)

  const updateActiveImageId = useCallback((id: string) => setActiveImageId(id), [])

  const updateDatasetLabel = (id, label) => {
    setImageDataset({ ...imageDataset, [id]: { ...imageDataset[id], givenLabel: label } })
    setLabelsChanged(true)
  }
  // load all data

  const populatePredProbs = async () => {
    setSubmittedDataset(imageDataset)
    const predProbs = await util.computePredProbs(imageDataset, CLASSES)
    setPredProbsData(predProbs)
    setPercentiles(util.computePercentiles(predProbs, CLASSES))
  }

  useEffect(() => {
    if (percentiles) {
      const classThresholds_ = CLASSES.reduce((acc, className) => {
        acc[className] = percentiles[className][classPercentile]
        return acc
      }, {})

      setClassThresholds(classThresholds_)

      const OODThresholds_ = CLASSES.reduce((acc, className) => {
        acc[className] = percentiles[className][OODPercentile]
        return acc
      }, {})

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
  }, [
    percentiles,
    predProbsData,
    classPercentile,
    setClassThresholds,
    OODPercentile,
    setOODThresholds,
  ])

  return (
    <ChakraProvider theme={theme}>
      <TourWrapper
        miniTourEnabled={miniTourEnabled}
        setMiniTourEnabled={setMiniTourEnabled}
        setTourEnabled={setTourEnabled}
        tourEnabled={tourEnabled}
      >
        <HStack
          w={'100%'}
          height={'calc(min(100vh,60vw))'}
          width={'100vw'}
          spacing={2}
          p={1}
          justify={'space-between'}
          minWidth={'1440px'}
          minHeight={'900px'}
        >
          <Box width={'15%'} height={'100%'}>
            <DatasetInterface
              data={imageDataset}
              classes={CLASSES}
              updateLabel={updateDatasetLabel}
              setActiveImageId={issues ? updateActiveImageId : doNothing}
            />
          </Box>
          <VStack
            w={'85%'}
            justify={'space-between'}
            align={'space-between'}
            h={'100%'}
            spacing={0}
          >
            <HStack width={'100%'} height={'100%'} align={'space-between'}>
              <Box height={'100%'} width={'20%'}>
                <PredProbs
                  data={predProbsData}
                  classes={CLASSES}
                  setActiveImageId={setActiveImageId}
                  populatePredProbs={populatePredProbs}
                  labelsChanged={labelsChanged}
                  setLabelsChanged={setLabelsChanged}
                  dataset={imageDataset}
                />
              </Box>
              <VStack w={'49%'} justify={'space-between'}>
                <ConfidentJoint
                  labels={CLASSES}
                  issues={confidentJointData}
                  activeImageId={activeImageId}
                  setActiveImageId={setActiveImageId}
                />
                <Box w={'100%'} h={'100%'}>
                  <PercentileThresholds
                    dataset={submittedDataset}
                    classes={CLASSES}
                    predProbsData={predProbsData}
                    activeImageId={activeImageId}
                    classPercentile={classPercentile}
                    setClassPercentile={setClassPercentile}
                    classThresholds={classThresholds}
                    OODPercentile={OODPercentile}
                    setOODPercentile={setOODPercentile}
                    OODThresholds={OODThresholds}
                  />
                </Box>
              </VStack>
              <VStack w={'31%'} height={'100%'} spacing={0} justify={'space-between'}>
                <HStack
                  justify={'flex-end'}
                  width={'100%'}
                  spacing={1}
                  height={'4%'}
                  align={'center'}
                >
                  <Button
                    variant={'ghost'}
                    onClick={() => setMiniTourEnabled(true)}
                    className={'tour-guide-button'}
                  >
                    Guide
                  </Button>
                  <Button
                    variant={'ghost'}
                    onClick={() => setTourEnabled(true)}
                    className={'tour-learn-button'}
                  >
                    Learn
                  </Button>
                  <Button as="a" variant={'ghost'} href="https://cleanlab.ai/blog/cleanlab-vizzy/">
                    Blog
                  </Button>
                  <Button as="a" variant={'ghost'} href="https://github.com/cleanlab/vizzy">
                    GitHub
                  </Button>
                  <ColorModeSwitcher justifySelf="flex-end" />
                </HStack>
                <Box h={'38%'}>
                  <Explainer
                    imageDataset={submittedDataset}
                    predProbsData={predProbsData}
                    classThresholds={classThresholds}
                    classes={CLASSES}
                    classPercentile={classPercentile}
                    OODPercentile={OODPercentile}
                    OODData={OODData}
                    activeImageId={activeImageId}
                  />
                </Box>
                <Box h={'54%'} w={'100%'}>
                  <Results
                    issues={issues}
                    OODData={OODData}
                    activeImageId={activeImageId}
                    setActiveImageId={setActiveImageId}
                  />
                </Box>
                <BuiltBy />
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </TourWrapper>
    </ChakraProvider>
  )
}
