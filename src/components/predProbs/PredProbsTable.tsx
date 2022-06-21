import {
  Box,
  Divider,
  Flex,
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
import PredProbsTableRow from './PredProbsTableRow'

interface PredProbsTableProps {
  data: Array<PredProbsEntryProps>
  setActiveImageId: (string) => void
}
const PredProbsTable = (props: PredProbsTableProps) => {
  const { data, setActiveImageId } = props

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
        <Tbody>
          {Object.values(data).map((datapoint) => (
            <PredProbsTableRow datapoint={datapoint} setActiveImageId={setActiveImageId} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PredProbsTable
