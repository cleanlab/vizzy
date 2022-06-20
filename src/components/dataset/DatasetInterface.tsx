import React from 'react'
import { Box, Flex, Grid, GridItem, Heading, SimpleGrid, Spinner, VStack } from '@chakra-ui/react'
import ImageWithLabel from './ImageWithLabel/ImageWithLabel'
import { DatasetInterfaceProps } from './types'
import LoadingSpinner from '../misc/Loading'

const DatasetInterface = (props: DatasetInterfaceProps) => {
  const { data, updateLabel } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        DATA
      </Heading>
      {!data && <LoadingSpinner />}
      {data && (
        <Grid templateColumns="repeat(1, 1fr)" gap={2} overflowY={'auto'}>
          {Object.values(data).map((datapoint) => (
            <GridItem key={datapoint.id}>
              <ImageWithLabel {...datapoint} updateLabel={updateLabel} />
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  )
}

export default DatasetInterface
