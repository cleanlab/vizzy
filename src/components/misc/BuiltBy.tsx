import React from 'react'
import { Button, Flex, Link, Text } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'

const BuiltBy = () => {
  return (
    <Flex w={'100%'} justify={'flex-end'} pr={2} align={'center'}>
      <Button
        size={'sm'}
        as="a"
        variant={'ghost'}
        href="https://github.com/cleanlab/vizzy"
        leftIcon={<FaGithub />}
      >
        Vizzy
      </Button>
      <Text fontSize={'sm'}>
        built with ♥ by <Link href={'https://github.com/calebchiam'}>Caleb</Link>,{' '}
        <Link href={'https://github.com/LukeMainwaring'}>Luke</Link>,{' '}
        <Link href={'https://github.com/yimingc9'}>Yiming</Link>
      </Text>
    </Flex>
  )
}

export default BuiltBy
