import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'
import ImageWithLabel from '../dataset/ImageWithLabel/ImageWithLabel'
import { LabelIssue } from './types'
import LabelIssueImage from './LabelIssueImage'
import NoResults from './NoResults'

interface ResultsProps {
  issues: Array<LabelIssue>
}

const Results = (props: ResultsProps) => {
  const { issues } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <Heading size={'md'}>Results</Heading>
      {issues.length === 0 && <NoResults />}
      {issues.length && (
        <Grid templateColumns="repeat(1, 1fr)" gap={0} overflowY={'auto'}>
          {issues.map((datapoint) => (
            <GridItem key={datapoint.id}>
              <LabelIssueImage {...datapoint} />
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  )
}

export default Results
