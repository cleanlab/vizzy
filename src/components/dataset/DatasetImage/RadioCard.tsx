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
        color={'gray.600'}
        boxShadow="lg"
        _checked={{
          bg: 'purple.100',
          color: 'black',
          textColor: 'purple.800',
          // fontWeight: 700,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          backgroundColor: 'purple.200',
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
