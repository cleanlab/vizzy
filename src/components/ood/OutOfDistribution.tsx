import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'
import ImageWithLabel from '../dataset/ImageWithLabel/ImageWithLabel'
import { LabelIssue } from '../results/types'
import LabelIssueImage from '../results/LabelIssueImage'
import EmptyResults from '../results/EmptyResults'

interface OODProps {
  issues: Array<LabelIssue>
  setActiveImageId: (string) => void
}

const OutOfDistribution = (props: OODProps) => {
  const { issues, setActiveImageId } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        Out of Distribution
      </Heading>
      {issues === null && <EmptyResults text={'No results yet.'} />}
      {issues?.length === 0 && <EmptyResults text={'No out-of-distribution examples found.'} />}
      {issues?.length && (
        <Grid templateColumns="repeat(6, 1fr)" gap={1} overflowY={'auto'}>
          {issues.map((datapoint) => (
            <GridItem key={datapoint.id}>
              <LabelIssueImage
                {...datapoint}
                id={datapoint.id}
                setActiveImageId={setActiveImageId}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  )
}

export default OutOfDistribution
