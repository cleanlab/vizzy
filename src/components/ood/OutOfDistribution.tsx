import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, Tag, VStack } from '@chakra-ui/react'
import ImageWithLabel from '../dataset/ImageWithLabel/ImageWithLabel'
import { LabelIssue } from '../issues/types'
import LabelIssueImage from '../issues/LabelIssueImage'
import EmptyIssues from '../issues/EmptyIssues'

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

const propsAreEqual = (prevProps, nextProps) => {
  if (!prevProps) {
    return false
  }
  return (
    JSON.stringify(Object.keys(prevProps).sort()) === JSON.stringify(Object.keys(nextProps).sort())
  )
}

export default React.memo(OutOfDistribution, propsAreEqual)
