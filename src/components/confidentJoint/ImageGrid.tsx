import { Grid, GridItem } from '@chakra-ui/react'
import LabelIssueImage from '../results/LabelIssueImage'
import React from 'react'
import { LabelIssue } from '../results/types'

interface ImageGridProps {
  issues: Record<string, LabelIssue>
  givenLabel: string
  suggestedLabel: string
  activeImageId: string
  setActiveImageId: (imageId: string) => void
}

const ImageGrid = (props: ImageGridProps) => {
  const { issues, givenLabel, suggestedLabel, activeImageId, setActiveImageId } = props
  return (
    <Grid templateColumns="repeat(10, 1fr)" gap={1} p={1} overflowY={'auto'} maxHeight={'155px'}>
      {Object.values(issues).map(
        (datapoint) =>
          datapoint['givenLabel'] === givenLabel &&
          datapoint['suggestedLabel'] === suggestedLabel && (
            <GridItem key={datapoint.id} height={'fit-content'}>
              <LabelIssueImage
                {...datapoint}
                id={datapoint.id}
                activeImageId={activeImageId}
                setActiveImageId={setActiveImageId}
              />
            </GridItem>
          )
      )}
    </Grid>
  )
}

export default ImageGrid