import React, { useState } from 'react'

import { PredProbsEntryProps } from '../predProbs/types'
import { Datapoint } from '../dataset/types'
import ThresholdSlider from './ThresholdSlider'
import { Box, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import PercentileSlider from '../predProbs/PercentileSlider'

interface PercentileThresholdsProps {
  dataset: Record<string, Datapoint>
  predProbsData: Record<string, PredProbsEntryProps>
  activeImageId: string
  classes: Array<string>
  classPercentile: number
  setClassPercentile: (number) => void
  classThresholds: Record<string, number>
  OODPercentile: number
  setOODPercentile: (number) => void
  OODThresholds: Record<string, number>
}

const PercentileThresholds = (props: PercentileThresholdsProps) => {
  const {
    dataset,
    predProbsData,
    activeImageId,
    classes,
    classPercentile,
    setClassPercentile,
    classThresholds,
    OODPercentile,
    setOODPercentile,
    OODThresholds,
  } = props
  const predProbs = activeImageId ? predProbsData[activeImageId] : null
  const datapoint = activeImageId ? dataset[activeImageId] : null
  const [showTooltip, setShowTooltip] = useState(false)
  const OODColor = useColorModeValue('red.400', 'red.200')
  const confidentColor = useColorModeValue('blue.400', 'blue.200')

  return (
    <VStack align={'space-between'} h={'100%'} px={6} spacing={8} className={'tour-explainer'}>
      <HStack width={'100%'} pt={2} className={'tour-sliders'}>
        <Box
          width={'50%'}
          borderWidth={'1px'}
          borderColor={OODColor}
          borderRadius={'lg'}
          padding={'10px'}
        >
          <PercentileSlider
            name={'Out-of-distribution percentile'}
            percentile={OODPercentile}
            setPercentile={(value) => {
              setOODPercentile(value)
              if (value > classPercentile) {
                setClassPercentile(value)
              }
            }}
          />
        </Box>
        <Box
          width={'50%'}
          borderWidth={'1px'}
          borderColor={confidentColor}
          borderRadius={'lg'}
          padding={'10px'}
        >
          <PercentileSlider
            name={'Class percentile'}
            percentile={classPercentile}
            setPercentile={(value) => {
              setClassPercentile(value)
              if (value < OODPercentile) {
                setOODPercentile(value)
              }
            }}
          />
        </Box>
      </HStack>
      <VStack
        width={'100%'}
        spacing={'2rem'}
        pb={3}
        align={'flex-start'}
        justify={'flex-start'}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {classes.map((cls) => (
          <ThresholdSlider
            key={cls}
            datapoint={datapoint}
            selectedClass={cls}
            classes={classes}
            predProbs={predProbs}
            classPercentile={classPercentile}
            classThresholds={classThresholds}
            OODPercentile={OODPercentile}
            OODThresholds={OODThresholds}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
          />
        ))}
      </VStack>
    </VStack>
  )
}

export default PercentileThresholds
