import React from 'react'
import {
  VStack,
  Heading,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Image,
  HStack,
  Divider,
  Flex,
} from '@chakra-ui/react'
import { PredProbsEntryProps, PredProbsProps } from './types'
import PredProbsTable from './PredProbsTable'

const PredProbs = (props: PredProbsProps) => {
  const { data } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        PREDICTED PROBABILITIES
      </Heading>
      {!data && (
        <Flex width={'100%'} height={'100%'} justify={'center'} align={'center'}>
          Nothing computed.
        </Flex>
      )}
      {data && <PredProbsTable data={Object.values(data)} />}
    </VStack>
  )
}

export default PredProbs
