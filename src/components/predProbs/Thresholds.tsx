import React from 'react'
import { HStack, Text, VStack } from '@chakra-ui/react'

interface ThresholdsProps {
  thresholds: Record<string, number>
}

const Thresholds = (props: ThresholdsProps) => {
  const { thresholds } = props
  return (
    <VStack>
      {Object.keys(thresholds).map((name) => {
        return (
          <HStack justify={'space-between'} width={'100%'} key={name}>
            <Text fontSize={'sm'}>Class '{name}' threshold</Text>
            <Text fontSize={'sm'} fontWeight={700}>
              {thresholds[name]}
            </Text>
          </HStack>
        )
      })}
    </VStack>
  )
}

export default Thresholds
