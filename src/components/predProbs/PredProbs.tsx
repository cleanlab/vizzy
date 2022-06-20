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
  Box,
} from '@chakra-ui/react'
import { PredProbsEntryProps, PredProbsProps } from './types'
import PredProbsTable from './PredProbsTable'
import PercentileSlider from './PercentileSlider'

const PredProbs = (props: PredProbsProps) => {
  const { data, classPercentile, setClassPercentile } = props

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
      {data && (
        <VStack height={'100%'}>
          <Box height={'80%'}>
            <PredProbsTable data={Object.values(data)} />
            <PercentileSlider percentile={classPercentile} setPercentile={setClassPercentile} />
          </Box>
        </VStack>
      )}
    </VStack>
  )
}

export default PredProbs
