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
} from '@chakra-ui/react'

const PredProbs = (props) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  const renderRow = (datapoint) => {
    return (
      <>
        <Tr>
          <Td>
            {
              <HStack height="40px">
                <Image
                  boxSize="50px"
                  src="https://labelerrors.com//static/imagenet/val/n03837869/ILSVRC2012_val_00016301.JPEG"
                />
                <Divider orientation="vertical" />
              </HStack>
            }
          </Td>
          <Td isNumeric>{Math.random().toFixed(3)}</Td>
          <Td isNumeric>{Math.random().toFixed(3)}</Td>
          <Td isNumeric>{Math.random().toFixed(3)}</Td>
        </Tr>
      </>
    )
  }

  return (
    <VStack width={'100%'} height={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        PREDICTED PROBABILITIES
      </Heading>
      <TableContainer overflowY={'auto'}>
        <Table variant="simple" size="sm">
          <TableCaption placement="top">Predicted Probabilities for each label</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>Example</Th>
              <Th isNumeric>C1</Th>
              <Th isNumeric>C2</Th>
              <Th isNumeric>C3</Th>
            </Tr>
          </Thead>
          <Tbody>{data.map((datapoint) => renderRow(datapoint))}</Tbody>
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
    </VStack>
  )
}

export default PredProbs
