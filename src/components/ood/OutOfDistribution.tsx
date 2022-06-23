import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, Tag, VStack } from '@chakra-ui/react'
import ImageWithLabel from '../dataset/ImageWithLabel/ImageWithLabel'
import { LabelIssue } from '../results/types'
import LabelIssueImage from '../results/LabelIssueImage'
import EmptyResults from '../results/EmptyResults'

interface OODProps {
  issues: Record<string, LabelIssue>
  activeImageId: string
  setActiveImageId: (string) => void
}

const OutOfDistribution = (props: OODProps) => {
  const { issues, activeImageId, setActiveImageId } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <Tag colorScheme={'red'} size={'md'}>
        Out of distribution
      </Tag>
      {issues === null && <EmptyResults text={'No results yet.'} />}
      {issues && Object.keys(issues).length === 0 && (
        <EmptyResults text={'No out-of-distribution examples found.'} />
      )}
      {issues && Object.keys(issues).length && (
        <Grid templateColumns="repeat(6, 1fr)" gap={1} overflowY={'auto'}>
          {Object.values(issues).map((datapoint) => (
            <GridItem key={datapoint.id}>
              <LabelIssueImage
                {...datapoint}
                id={datapoint.id}
                activeImageId={activeImageId}
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
