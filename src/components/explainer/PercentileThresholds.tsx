import React, { useState } from 'react'

import { PredProbsEntryProps } from '../predProbs/types'
import { Datapoint } from '../dataset/types'
import ThresholdSlider from './ThresholdSlider'

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

  return (
    <>
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
        />
      ))}
    </>
  )
}

export default PercentileThresholds
