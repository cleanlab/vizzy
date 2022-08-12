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
        borderColor={'gray.300'}
        color={'gray.600'}
        boxShadow="lg"
        _checked={{
          bg: 'teal.500',
          color: 'white',
          borderColor: 'teal.200',
        }}
        _focus={{
          boxShadow: 'outline',
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
