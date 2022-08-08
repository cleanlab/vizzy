import React from 'react'
import { Grid, GridItem, Tag, VStack } from '@chakra-ui/react'
import { LabelIssue } from '../issues/types'
import LabelIssueImage from '../issues/LabelIssueImage'
import EmptyIssues from '../issues/EmptyIssues'
import deepEqual from 'deep-equal'

interface OODProps {
  issues: Record<string, LabelIssue>
  activeImageId: string
  setActiveImageId: (imageId: string) => void
}

const OutOfDistribution = (props: OODProps) => {
  const { issues, activeImageId, setActiveImageId } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <Tag colorScheme={'red'} size={'md'}>
        OUT OF DISTRIBUTION
      </Tag>
      {issues === null && <EmptyIssues text={'No results yet.'} />}
      {issues && Object.keys(issues).length === 0 && (
        <EmptyIssues text={'No out-of-distribution examples found.'} />
      )}
      {issues && Object.keys(issues).length && (
        <Grid templateColumns="repeat(6, 1fr)" gap={1} overflowY={'auto'}>
          {Object.values(issues).map((datapoint) => (
            <GridItem key={datapoint.id}>
              <LabelIssueImage
                {...datapoint}
                id={datapoint.id}
                isActive={datapoint.id === activeImageId}
                setActiveImageId={setActiveImageId}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  )
}

const propsAreEqual = (prevProps, nextProps) => {
  return deepEqual(prevProps, nextProps)
}

export default React.memo(OutOfDistribution, propsAreEqual)
