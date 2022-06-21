import React from 'react'
import { Grid, GridItem, VStack, Tag, HStack } from '@chakra-ui/react'
import LabelIssueImage from '../results/LabelIssueImage'
import { LabelIssue } from '../results/types'

interface ConfidentJointProps {
  labels: Array<string>
  issues: Record<string, LabelIssue>
  setActiveImageId: (string) => void
}

const ConfidentJointMatrix = (props: ConfidentJointProps) => {
  const { labels, issues, setActiveImageId } = props

  const renderImageGrid = (givenLabel, suggestedLabel) => {
    return (
      <Grid templateColumns="repeat(5, 1fr)" gap={1} p={1} overflowY={'auto'}>
        {Object.values(issues)
          .slice(0, 30)
          .map((datapoint) => (
            // TODO: enable this condition when labels are real
            //   datapoint['givenLabel'] === givenLabel &&
            //   datapoint['suggestedLabel'] === suggestedLabel &&
            <GridItem key={datapoint.id} height={'fit-content'}>
              <LabelIssueImage
                {...datapoint}
                id={datapoint.id}
                setActiveImageId={setActiveImageId}
              />
            </GridItem>
          ))}
      </Grid>
    )
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={0} width={'100%'} height={'100%'}>
      <Grid borderWidth="1px" borderColor="gray.600">
        <GridItem>{issues && renderImageGrid(labels[0], labels[0])}</GridItem>
      </Grid>
      <Grid borderWidth="1px">
        <GridItem>{issues && renderImageGrid(labels[0], labels[1])}</GridItem>
      </Grid>
      <Grid borderWidth="1px">
        <GridItem>{issues && renderImageGrid(labels[0], labels[2])}</GridItem>
      </Grid>
      <Grid borderWidth="1px">
        <GridItem>{issues && renderImageGrid(labels[1], labels[0])}</GridItem>
      </Grid>
      <Grid borderWidth="1px" borderColor="gray.600">
        <GridItem>{issues && renderImageGrid(labels[1], labels[1])}</GridItem>
      </Grid>
      <Grid borderWidth="1px">
        <GridItem>{issues && renderImageGrid(labels[1], labels[2])}</GridItem>
      </Grid>
      <Grid borderWidth="1px">
        <GridItem>{issues && renderImageGrid(labels[2], labels[0])}</GridItem>
      </Grid>
      <Grid borderWidth="1px">
        <GridItem>{issues && renderImageGrid(labels[2], labels[1])}</GridItem>
      </Grid>
      <Grid borderWidth="1px" borderColor="gray.600">
        <GridItem>{issues && renderImageGrid(labels[2], labels[2])}</GridItem>
      </Grid>
    </Grid>
  )
}

export default ConfidentJointMatrix
