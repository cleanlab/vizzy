import { Flex, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const EmptyResults = ({ text }) => {
  return (
    <Flex
      borderColor={useColorModeValue('gray.500', 'gray.300')}
      borderWidth={'1px'}
      width={'100%'}
      height={'100%'}
      backgroundColor={useColorModeValue('gray.100', 'gray.600')}
      justify={'center'}
      align={'center'}
    >
      {text}
    </Flex>
  )
}
export default EmptyResults
