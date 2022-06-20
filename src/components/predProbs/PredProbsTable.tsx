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

interface PredProbsTableProps {
  data: Array<PredProbsEntryProps>
}
const PredProbsTable = (props: PredProbsTableProps) => {
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
    <TableContainer overflowY={'auto'} height={'100%'}>
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
  )
}

export default PredProbsTable
