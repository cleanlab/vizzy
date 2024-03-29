import { Grid, GridItem } from '@chakra-ui/react'
import LabelIssueImage from '../issues/LabelIssueImage'
import React from 'react'
import { LabelIssue } from '../issues/types'

interface ImageGridProps {
  issues: Record<string, LabelIssue>
  givenLabel: string
  suggestedLabel: string
  activeImageId: string
  activeImageIdDispatch: any
}

const ImageGrid = (props: ImageGridProps) => {
  const { issues, givenLabel, suggestedLabel, activeImageId, activeImageIdDispatch } = props
  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={1} p={1} overflowY={'auto'}>
      {Object.values(issues).map(
        (datapoint) =>
          datapoint['givenLabel'] === givenLabel &&
          datapoint['suggestedLabel'] === suggestedLabel && (
            <GridItem key={datapoint.id} height={'fit-content'}>
              <LabelIssueImage
                {...datapoint}
                id={datapoint.id}
                isActive={datapoint.id === activeImageId}
                activeImageIdDispatch={activeImageIdDispatch}
              />
            </GridItem>
          )
      )}
    </Grid>
  )
}

export default React.memo(ImageGrid)
