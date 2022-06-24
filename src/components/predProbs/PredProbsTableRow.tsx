import { PredProbsEntryProps } from './types'
import { Box, Flex, Image, Td, Tr } from '@chakra-ui/react'
import placeholder from '../../assets/placeholder.png'
import React from 'react'

interface PredProbsTableRowProps {
  datapoint: PredProbsEntryProps
  setActiveImageId: (string) => void
}
const PredProbsTableRow = (props: PredProbsTableRowProps) => {
  const { datapoint, setActiveImageId } = props
  return (
    <Tr>
      <Td>
        <Flex width={'50px'} justify={'center'} align={'center'}>
          <Box onMouseEnter={() => setActiveImageId(datapoint.id)}>
            <Image height={'50px'} src={datapoint.src} loading={'lazy'} fallbackSrc={placeholder} />
          </Box>
        </Flex>
      </Td>
      {datapoint.probabilities.map((prob, idx) => (
        <Td isNumeric key={idx}>
          {prob.toFixed(3)}
        </Td>
      ))}
    </Tr>
  )
}

export default PredProbsTableRow
