import { PredProbsEntryProps } from './types'
import { Flex, HStack, Image, Td, Text, Tr, VStack } from '@chakra-ui/react'
import React from 'react'
import placeholder from '../../assets/placeholder.png'
import { Datapoint } from '../dataset/types'

interface PredProbsTableRowProps {
  datapoint: PredProbsEntryProps
  classes: string[]
  activeImageIdDispatch: any
}

interface EmptyPredProbsTableRowProps {
  datapoint: Datapoint
}

export const EmptyPredProbsTableRow = (props: EmptyPredProbsTableRowProps) => {
  const { datapoint } = props
  return (
    <Tr>
      <Td w={'50px'} textAlign={'center'} p={'8px'}>
        <Flex width={'100%'} justify={'center'} align={'center'}>
          <Image
            height={'50px'}
            width={'50px'}
            src={datapoint.src}
            loading={'lazy'}
            fallbackSrc={placeholder}
          />
        </Flex>
      </Td>
      <Td textAlign={'center'}> </Td>
    </Tr>
  )
}

export const PredProbsTableRow = (props: PredProbsTableRowProps) => {
  const { datapoint, classes, activeImageIdDispatch } = props
  return (
    <Tr>
      <Td w={'50px'} textAlign={'center'} p={'8px'}>
        <Flex
          width={'100%'}
          justify={'center'}
          align={'center'}
          onMouseEnter={() => activeImageIdDispatch({ type: 'setActiveImageId', id: datapoint.id })}
        >
          <Image
            height={'50px'}
            width={'50px'}
            src={datapoint.src}
            loading={'lazy'}
            fallbackSrc={placeholder}
          />
        </Flex>
      </Td>
      <Td textAlign={'center'}>
        <VStack spacing={0} align={'flex-start'}>
          {datapoint.probabilities.map((prob, idx) => (
            <HStack justify={'space-between'} w={'100%'} key={idx}>
              <Text>{classes[idx]}</Text>
              <Text>{prob.toFixed(3)}</Text>
            </HStack>
          ))}
        </VStack>
      </Td>
    </Tr>
  )
}
