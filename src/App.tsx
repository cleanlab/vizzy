import * as React from 'react'
import { useEffect, useState } from 'react'
import { Box, ChakraProvider, Divider, Heading, HStack, VStack } from '@chakra-ui/react'
import { theme } from './styles/theme'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DatasetInterface from './components/dataset/DatasetInterface'
import PredProbs from './components/predProbs/PredProbs'
import ConfidentJoint from './components/confidentJoint/ConfidentJoint'
import Results from './components/results/Results'
import OutOfDistribution from './components/ood/OutOfDistribution'
import { Datapoint } from './components/dataset/types'
import Explainer from './components/explainer/Explainer'
import { LabelIssue, LabelIssueImageProps } from './components/results/types'
import { PredProbsEntryProps } from './components/predProbs/types'
import Thresholds from './components/predProbs/Thresholds'

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
  const [OODPercentile, setOODPercentile] = useState(5)
  const embeddings: Record<string, Datapoint> = require('./model/embeddings_32.json')

  console.log('OOD percentile', OODPercentile)
  const updateDatasetLabel = (id, label) => {
    console.log(`updating label to ${label}`)
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
    console.log('returned pred probs', predProbs)
    setPredProbsData(predProbs)
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch('https://labelerrors.com/api/data?dataset=ImageNet&page=1&limit=300')
  //     const data = await res.json()
  //
  //     setPredProbsData(
  //       data.reduce((acc, e, idx) => {
  //         const id = `image-${idx}`
  //         acc[id] = {
  //           id,
  //           src: `https://labelerrors.com/${e['path']}`,
  //           givenLabel: e['label'],
  //           probabilities: [...Array(3)].map((e) => Math.random().toFixed(3)),
  //         }
  //         return acc
  //       }, {})
  //     )
  //
  //     setIssues(
  //       data.slice(0, 40).reduce((acc, e, idx) => {
  //         const id = `image-${idx}`
  //         acc[id] = {
  //           id,
  //           src: `https://labelerrors.com/${e['path']}`,
  //           givenLabel: e['label'],
  //           suggestedLabel: 'kirby',
  //         }
  //         return acc
  //       }, {})
  //     )
  //
  //     setOODData(
  //       data.slice(30, 60).reduce((acc, e, idx) => {
  //         const id = `image-${30 + idx}`
  //         acc[id] = {
  //           id: `image-${30 + idx}`,
  //           src: `https://labelerrors.com/${e['path']}`,
  //           givenLabel: e['label'],
  //           suggestedLabel: 'kirby',
  //         }
  //         return acc
  //       }, {})
  //     )
  //   }
  //   fetchData()
  // }, [])

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
      <VStack width={'100%'} height={'100%'}>
        <HStack justify={'flex-end'} width={'100%'}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
        <HStack width={'95%'} height={'90vh'}>
          <Box width={'20%'} height={'100%'}>
            <DatasetInterface
              data={imageDataset}
              classes={CLASSES}
              updateLabel={updateDatasetLabel}
            />
          </Box>
          <VStack width={'60%'} height={'100%'}>
            <HStack width={'100%'} height={'70%'} align={'space-between'}>
              <VStack width={'40%'} height={'100%'} spacing={'0rem'}>
                <Box height={'100%'}>
                  <PredProbs
                    data={predProbsData}
                    classes={CLASSES}
                    classPercentile={classPercentile}
                    setClassPercentile={setClassPercentile}
                    OODPercentile={OODPercentile}
                    setOODPercentile={setOODPercentile}
                    setActiveImageId={setActiveImageId}
                    populatePredProbs={populatePredProbs}
                  />
                </Box>
                {/*<Box height={'20%'}>*/}
                {/*  <Thresholds thresholds={classThresholds} />*/}
                {/*</Box>*/}
              </VStack>
              <ConfidentJoint
                labels={CLASSES}
                issues={confidentJointData}
                setActiveImageId={setActiveImageId}
              />
            </HStack>
            <Divider />
            <Box height={'30%'} width={'100%'}>
              <Explainer
                imageDataset={imageDataset}
                predProbsData={predProbsData}
                classes={CLASSES}
                thresholds={classThresholds}
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
