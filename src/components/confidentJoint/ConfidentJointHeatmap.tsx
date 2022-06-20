import React from 'react'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { data } from './heatmapData'

const ConfidentJointHeatmap = (props) => {
  return (
    <ResponsiveHeatMap
      data={data}
      margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
      // valueFormat=">-.2s" // TODO: restrict probs decimal range
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: 'Predicted Label', // TODO: figure out why it's displayed behind chart
        legendOffset: 46,
      }}
      // axisRight={{
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legendPosition: 'middle',
      //   legendOffset: 70,
      // }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Actual Label',
        legendPosition: 'middle',
        legendOffset: -72,
      }}
      colors={{
        type: 'diverging',
        scheme: 'red_yellow_blue',
        divergeAt: 0.5,
        minValue: 0,
        maxValue: 1,
      }}
      emptyColor="#555555"
      legends={[
        {
          anchor: 'bottom',
          translateX: 0,
          translateY: 30,
          length: 400,
          thickness: 8,
          direction: 'row',
          tickPosition: 'after',
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          // tickFormat: '>-.2s',
          title: 'Value →',
          titleAlign: 'start',
          titleOffset: 4,
        },
      ]}
    />
  )
}

export default ConfidentJointHeatmap
