import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

const LoadingSpinner = () => {
  return (
    <Flex height={'100%'} width={'100%'} justify={'center'} align={'center'}>
      <Spinner />
    </Flex>
  )
}

export default LoadingSpinner
