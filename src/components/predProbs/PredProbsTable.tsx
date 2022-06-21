import {
  Divider,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
import { PredProbsEntryProps } from './types'
import placeholder from '../../assets/placeholder.png'

interface PredProbsTableProps {
  data: Array<PredProbsEntryProps>
}
const PredProbsTable = (props: PredProbsTableProps) => {
  const { data } = props

  const renderRow = (datapoint: PredProbsEntryProps) => {
    return (
      <Tr key={datapoint.id}>
        <Td>
          <HStack height="40px">
            <Image boxSize="50px" src={datapoint.src} loading={'lazy'} fallbackSrc={placeholder} />
            <Divider orientation="vertical" />
          </HStack>
        </Td>
        {datapoint.probabilities.map((prob, idx) => (
          <Td isNumeric key={idx}>
            {prob}
          </Td>
        ))}
      </Tr>
    )
  }

  return (
    <TableContainer overflowY={'auto'} height={'100%'}>
      <Table variant="simple" size="sm">
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
  )
}

export default PredProbsTable
