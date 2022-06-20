import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'
import ImageWithLabel from '../dataset/ImageWithLabel/ImageWithLabel'
import { LabelIssue } from './types'
import LabelIssueImage from './LabelIssueImage'
import EmptyResults from './EmptyResults'

interface ResultsProps {
  issues: Array<LabelIssue>
}

const Results = (props: ResultsProps) => {
  const { issues } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        LABEL ISSUES
      </Heading>
      {issues === null && <EmptyResults text={'No results yet.'} />}
      {issues?.length === 0 && <EmptyResults text={'No errors found.'} />}
      {issues?.length && (
        <Grid templateColumns="repeat(2, 1fr)" gap={0} overflowY={'auto'}>
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
