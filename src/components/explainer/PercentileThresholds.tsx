import React, { useState } from 'react'

import { PredProbsEntryProps } from '../predProbs/types'
import { Datapoint } from '../dataset/types'
import ThresholdSlider from './ThresholdSlider'
import { VStack } from '@chakra-ui/react'

interface ExplanationProps {
  datapoint: Datapoint
  classes: Array<string>
  predProbs: PredProbsEntryProps
  classPercentile: number
  classThresholds: Record<string, number>
  OODPercentile: number
  OODThresholds: Record<string, number>
  isOOD: boolean
}

const PercentileThresholds = (props: ExplanationProps) => {
  const {
    datapoint,
    classes,
    predProbs,
    classPercentile,
    classThresholds,
    OODPercentile,
    OODThresholds,
    isOOD,
  } = props

  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <VStack
      width={'100%'}
      height={'100%'}
      spacing={'2rem'}
      align={'flex-start'}
      pl={'4px'}
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
          isOOD={isOOD}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
        />
      ))}
    </VStack>
  )
}

export default PercentileThresholds
