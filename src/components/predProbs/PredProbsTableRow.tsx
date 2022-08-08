import { PredProbsEntryProps } from './types'
import { Flex, Image, Td, Tr } from '@chakra-ui/react'
import React from 'react'
import placeholder from '../../assets/placeholder.png'

interface PredProbsTableRowProps {
  datapoint: PredProbsEntryProps
  setActiveImageId: (string) => void
}

const PredProbsTableRow = (props: PredProbsTableRowProps) => {
  const { datapoint, setActiveImageId } = props
  return (
    <Tr>
      <Td w={'50px'} textAlign={'center'}>
        <Flex
          width={'100%'}
          justify={'center'}
          align={'center'}
          onMouseEnter={() => setActiveImageId(datapoint.id)}
        >
          <Image height={'50px'} src={datapoint.src} loading={'lazy'} fallbackSrc={placeholder} />
          {/*<Box>hi</Box>*/}
        </Flex>
      </Td>
      {datapoint.probabilities.map((prob, idx) => (
        <Td key={prob} textAlign={'center'}>
          {prob.toFixed(3)}
        </Td>
      ))}
    </Tr>
  )
}

export default PredProbsTableRow
