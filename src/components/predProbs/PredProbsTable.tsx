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
  useColorModeValue,
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
  const dummyDataEntry = {
    id: null,
    src: 'https://via.placeholder.com/150',
    givenLabel: null,
    probabilities: [],
  }

  return (
    <TableContainer overflowY={'auto'} height={'100%'}>
      <Table variant="simple" size="sm">
        <Thead position="sticky" top="0" backgroundColor={useColorModeValue('white', 'gray.900')}>
          <Tr>
            <Th isNumeric>Image</Th>
            {classes.map((c) => (
              <Th isNumeric key={c}>
                {c}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(data).length > 0 &&
            Object.values(data).map((datapoint) => (
              <PredProbsTableRow
                key={datapoint.id}
                datapoint={datapoint}
                setActiveImageId={setActiveImageId}
              />
            ))}
          {Object.values(data).length === 0 &&
            [...Array(10)].map((x) => (
              <PredProbsTableRow
                key={x}
                datapoint={dummyDataEntry}
                setActiveImageId={(str) => null}
              />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

//<Tr key={idx}><Td>d</Td><Td>d</Td><Td>d</Td><Td>d</Td></Tr>
export default PredProbsTable
