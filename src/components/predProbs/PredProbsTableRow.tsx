import { PredProbsEntryProps } from './types'
import { Flex, Image, Td, Tr } from '@chakra-ui/react'
import React from 'react'
import placeholder from '../../assets/placeholder.png'
import { Datapoint } from '../dataset/types'

interface PredProbsTableRowProps {
  datapoint: PredProbsEntryProps
  setActiveImageId: (string) => void
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
      {[0, 1, 2].map((idx) => (
        <Td key={idx} textAlign={'center'}></Td>
      ))}
    </Tr>
  )
}

export const PredProbsTableRow = (props: PredProbsTableRowProps) => {
  const { datapoint, setActiveImageId } = props
  return (
    <Tr>
      <Td w={'50px'} textAlign={'center'} p={'8px'}>
        <Flex
          width={'100%'}
          justify={'center'}
          align={'center'}
          onMouseEnter={() => setActiveImageId(datapoint.id)}
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
      {datapoint.probabilities.map((prob, idx) => (
        <Td key={prob} textAlign={'center'}>
          {prob.toFixed(3)}
        </Td>
      ))}
    </Tr>
  )
}
