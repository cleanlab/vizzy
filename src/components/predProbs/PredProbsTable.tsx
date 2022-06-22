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
  Text,
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
  const dummyPredProbs = {
    id: null,
    src: null,
    givenLabel: null,
    probabilities: [],
  }

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

//<Tr key={idx}><Td>d</Td><Td>d</Td><Td>d</Td><Td>d</Td></Tr>
export default PredProbsTable
