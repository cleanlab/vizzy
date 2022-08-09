import React from 'react'
import { Flex, Link, Text } from '@chakra-ui/react'

const BuiltBy = () => {
  return (
    <Flex w={'100%'} justify={'flex-end'}>
      <Text fontSize={'md'}>
        Built with ♥ by <Link href={'https://github.com/calebchiam'}>Caleb</Link>,{' '}
        <Link href={'https://github.com/LukeMainwaring'}>Luke</Link>,{' '}
        <Link href={'https://github.com/yimingc9'}>Yiming</Link> at Cleanlab
      </Text>
    </Flex>
  )
}

export default BuiltBy
