import { Box, useRadio } from '@chakra-ui/react'
import * as React from 'react'

export const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        backgroundColor={'gray.300'}
        cursor="pointer"
        borderRadius="md"
        border="1px"
        borderColor={'gray.500'}
        color={'gray.600'}
        boxShadow="lg"
        _checked={{
          bg: 'teal.400',
          color: 'black',
          borderColor: 'gray.800',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          backgroundColor: 'teal.500',
        }}
        px={3}
        py={0.5}
        fontSize={'sm'}
        marginTop={'1'}
        marginBottom={'1'}
      >
        {props.children}
      </Box>
    </Box>
  )
}
