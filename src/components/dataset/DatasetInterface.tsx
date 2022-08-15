import React from 'react'
import {
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
  const { data, classes, updateLabel, setActiveImageId } = props

  return (
    <VStack
      className={'tour-dataset-interface'}
      width={'100%'}
      height={'100%'}
      bgColor={useColorModeValue('teal.50', 'teal.700')}
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
                updateLabel={updateLabel}
                setActiveImageId={setActiveImageId}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  )
}

const propsAreEqual = (prevProps: DatasetInterfaceProps, nextProps: DatasetInterfaceProps) => {
  const prevData = prevProps.data
  const nextData = nextProps.data
  if (prevProps.setActiveImageId !== nextProps.setActiveImageId) {
    return false
  }
  // if (prevData.)
  return Object.entries(prevData).every((entry) => {
    const id = entry[0]
    const datapoint = entry[1]
    return datapoint.givenLabel === nextData[id].givenLabel
  })
}

export default React.memo(DatasetInterface, propsAreEqual)
