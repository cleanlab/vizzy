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
  classes: Array<string>
  setActiveImageId: (string) => void
}
const PredProbsTable = (props: PredProbsTableProps) => {
  const { data, classes, setActiveImageId } = props
  console.log('data in pred probs table', data)

  return (
    <TableContainer overflowY={'auto'} height={'100%'}>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th isNumeric>Example</Th>
            {classes.map((c) => (
              <Th isNumeric key={c}>
                {c}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(data).map((datapoint) => (
            <PredProbsTableRow
              key={datapoint.id}
              datapoint={datapoint}
              setActiveImageId={setActiveImageId}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PredProbsTable
