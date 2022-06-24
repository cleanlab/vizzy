import React from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  VStack,
  Text,
} from '@chakra-ui/react'
import ImageWithLabel from './ImageWithLabel/ImageWithLabel'
import { DatasetInterfaceProps } from './types'
import LoadingSpinner from '../misc/Loading'

const DatasetInterface = (props: DatasetInterfaceProps) => {
  const { data, classes, updateLabel } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <HStack spacing={'1rem'}>
        <Heading size={'sm'} fontWeight={500}>
          DATA
        </Heading>
        <Text fontSize={'xs'} fontStyle={'italic'}>
          tweak the image labels!
        </Text>
      </HStack>

      {!data && <LoadingSpinner />}
      {data && (
        <Grid templateColumns="repeat(1, 1fr)" gap={2} overflowY={'auto'}>
          {Object.values(data).map((datapoint) => (
            <GridItem key={datapoint.id}>
              <ImageWithLabel {...datapoint} classes={classes} updateLabel={updateLabel} />
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  )
}

export default DatasetInterface
