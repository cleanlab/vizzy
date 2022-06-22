import { Flex, useColorModeValue, Text } from '@chakra-ui/react'
import React from 'react'

const EmptyResults = ({ text }) => {
  return (
    <Flex
      width={'100%'}
      height={'100%'}
      backgroundColor={useColorModeValue('gray.50', 'gray.600')}
      justify={'center'}
      align={'center'}
    >
      <Text fontSize={'md'} fontStyle={'italic'}>
        {text}
      </Text>
    </Flex>
  )
}
export default EmptyResults
