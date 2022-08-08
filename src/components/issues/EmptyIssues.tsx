import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const EmptyIssues = ({ text }) => {
  return (
    <Flex width={'100%'} height={'100%'} justify={'center'} align={'center'}>
      <Text fontSize={'md'} fontStyle={'italic'}>
        {text}
      </Text>
    </Flex>
  )
}
export default EmptyIssues
