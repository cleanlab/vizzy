import { Table, TableContainer, Tbody, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { PredProbsEntryProps } from './types'
import { EmptyPredProbsTableRow, PredProbsTableRow } from './PredProbsTableRow'
import { Datapoint } from '../dataset/types'
import deepEqual from 'deep-equal'

interface PredProbsTableProps {
  data: Array<PredProbsEntryProps>
  classes: Array<string>
  dataset: Record<string, Datapoint>
  activeImageIdDispatch: any
}

const PredProbsTable = (props: PredProbsTableProps) => {
  const { data, classes, activeImageIdDispatch, dataset } = props

  return (
    <TableContainer overflowY={'auto'} height={'100%'}>
      <Table variant="simple" size="sm">
        <Thead position="sticky" top="0" backgroundColor={useColorModeValue('white', 'gray.900')}>
          <Tr>
            <Th textAlign={'center'}>Image</Th>
            <Th textAlign={'center'}>Probabilities</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.values(data).length > 0 &&
            Object.values(data).map((datapoint) => (
              <PredProbsTableRow
                key={datapoint.id}
                classes={classes}
                datapoint={datapoint}
                activeImageIdDispatch={activeImageIdDispatch}
              />
            ))}
          {Object.values(data).length === 0 &&
            Object.values(dataset).map((datapoint, i) => (
              <EmptyPredProbsTableRow key={i} datapoint={datapoint} />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const propsAreEqual = (prevProps, nextProps) => {
  return deepEqual(prevProps.data, nextProps.data) && prevProps.classes === nextProps.classes
}

export default React.memo(PredProbsTable, propsAreEqual)
