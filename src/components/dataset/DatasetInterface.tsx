import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, SimpleGrid, Spinner, VStack } from '@chakra-ui/react'
import ImageWithLabel from './ImageWithLabel/ImageWithLabel'
import { DatasetInterfaceProps } from './types'
import LoadingSpinner from '../misc/Loading'

const DatasetInterface = (props: DatasetInterfaceProps) => {
  const { data } = props

  if (!data) {
    return <LoadingSpinner />
  }

  return (
    <VStack width={'100%'} height={'100%'} overflowY={'auto'}>
      <Heading size={'md'}>Dataset</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={0}>
        {data.slice(300).map((datapoint) => (
          <GridItem key={datapoint.id}>
            <ImageWithLabel {...datapoint} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  )
}

export default DatasetInterface
