import React from 'react'
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import ImageWithLabel from './ImageWithLabel/ImageWithLabel'
import { DatasetInterfaceProps } from './types'
import LoadingSpinner from '../misc/Loading'

const DatasetInterface = (props: DatasetInterfaceProps) => {
  const { data, classes, updateLabel } = props

  return (
    <VStack
      width={'100%'}
      height={'100%'}
      bgColor={useColorModeValue('teal.50', 'teal.700')}
      p={3}
      rounded={'md'}
    >
      <HStack spacing={2}>
        <HStack>
          <Text>1.</Text>
          <Heading size={'sm'} fontWeight={500}>
            DATASET
          </Heading>
        </HStack>
        <Flex w={'100%'} justify={'flex-end'}>
          <Text fontSize={'xs'} fontStyle={'italic'}>
            add label errors!
          </Text>
        </Flex>
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
