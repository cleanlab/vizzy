import React from 'react'
import { Grid, GridItem, Tag, VStack } from '@chakra-ui/react'
import { LabelIssue } from './types'
import LabelIssueImage from './LabelIssueImage'
import EmptyIssues from './EmptyIssues'

interface ResultsProps {
  issues: Record<string, LabelIssue>
  activeImageId: string
  activeImageIdDispatch: any
}

const Issues = (props: ResultsProps) => {
  const { issues, activeImageId, activeImageIdDispatch } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <Tag colorScheme={'purple'} size={'md'}>
        LABEL ISSUES
      </Tag>
      {issues === null && <EmptyIssues text={'No results yet.'} />}
      {issues && Object.keys(issues).length === 0 && <EmptyIssues text={'No errors found.'} />}
      {issues && Object.keys(issues).length && (
        <Grid templateColumns="repeat(5, 1fr)" gap={1} overflowY={'auto'}>
          {Object.values(issues).map((datapoint) => (
            <GridItem key={datapoint.id}>
              <LabelIssueImage
                {...datapoint}
                id={datapoint.id}
                isActive={datapoint.id === activeImageId}
                activeImageIdDispatch={activeImageIdDispatch}
                showGivenLabel
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  )
}

export default Issues
