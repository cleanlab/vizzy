import React from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import DatasetImage from './DatasetImage/DatasetImage'
import { DatasetInterfaceProps } from './types'
import LoadingSpinner from '../misc/Loading'

const DatasetInterface = (props: DatasetInterfaceProps) => {
  const { data, classes, imageDatasetDispatch, activeImageIdDispatch } = props
  const numQuestionableLabels = Object.values(data).reduce((acc, item) => {
    if (item.originalLabel !== item.givenLabel) {
      acc += 1
    }
    return acc
  }, 0)

  return (
    <VStack
      className={'tour-dataset-interface'}
      width={'100%'}
      height={'100%'}
      bgColor={useColorModeValue('purple.50', 'purple.900')}
      p={2}
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
              <DatasetImage
                {...datapoint}
                classes={classes}
                imageDatasetDispatch={imageDatasetDispatch}
                activeImageIdDispatch={activeImageIdDispatch}
              />
            </GridItem>
          ))}
        </Grid>
      )}
      <VStack w={'100%'} fontSize={'sm'}>
        <HStack justify={'space-between'} w={'100%'}>
          <Box>Dataset size</Box>
          <Box>300</Box>
        </HStack>
        <HStack justify={'space-between'} w={'100%'}>
          <Box>cats, dogs, bears</Box>
          <Box>97, 97, 97</Box>
        </HStack>
        <HStack justify={'space-between'} w={'100%'}>
          <Box>out-of-distribution</Box>
          <Box>9</Box>
        </HStack>
        <HStack justify={'space-between'} w={'100%'} fontWeight={600}>
          <Box>Questionable labels</Box>
          <Box>{numQuestionableLabels}</Box>
        </HStack>
      </VStack>
    </VStack>
  )
}

const propsAreEqual = (prevProps: DatasetInterfaceProps, nextProps: DatasetInterfaceProps) => {
  const prevData = prevProps.data
  const nextData = nextProps.data
  if (prevProps.activeImageIdDispatch !== nextProps.activeImageIdDispatch) {
    return false
  }
  return Object.entries(prevData).every((entry) => {
    const id = entry[0]
    const datapoint = entry[1]
    return datapoint.givenLabel === nextData[id].givenLabel
  })
}

export default React.memo(DatasetInterface, propsAreEqual)
