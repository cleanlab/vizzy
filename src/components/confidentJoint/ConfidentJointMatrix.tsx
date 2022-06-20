import React from 'react'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import ConfidentJointHeatmap from './ConfidentJointHeatmap'

const ConfidentJointMatrix = (props) => {
  return (
    <Stack align={'center'} height={'100%'} width={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        Confident Joint matrix
      </Heading>
      <ConfidentJointHeatmap />
    </Stack>
  )
}

export default ConfidentJointMatrix
