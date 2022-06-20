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

const PredProbs = (props: PredProbsProps) => {
  const { data } = props
  const renderRow = (datapoint: PredProbsEntryProps) => {
    return (
      <Tr>
        <Td>
          <HStack height="40px">
            <Image boxSize="50px" src={datapoint.src} />
            <Divider orientation="vertical" />
          </HStack>
        </Td>
        {datapoint.probabilities.map((prob) => (
          <Td isNumeric>{prob}</Td>
        ))}
      </Tr>
    )
  }

  return (
    <VStack width={'100%'} height={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        PREDICTED PROBABILITIES
      </Heading>
      {!data && (
        <Flex width={'100%'} height={'100%'} justify={'center'} align={'center'}>
          Nothing found.
        </Flex>
      )}
      {data && (
        <TableContainer overflowY={'auto'}>
          <Table variant="simple" size="sm">
            {/*<TableCaption placement="top">Predicted Probabilities for each label</TableCaption>*/}
            <Thead>
              <Tr>
                <Th isNumeric>Example</Th>
                <Th isNumeric>C1</Th>
                <Th isNumeric>C2</Th>
                <Th isNumeric>C3</Th>
              </Tr>
            </Thead>
            <Tbody>{Object.values(data).map((datapoint) => renderRow(datapoint))}</Tbody>
            <Tfoot>
              <Tr>
                <Th isNumeric>Example</Th>
                <Th isNumeric>C1</Th>
                <Th isNumeric>C2</Th>
                <Th isNumeric>C3</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </VStack>
  )
}

export default PredProbs
