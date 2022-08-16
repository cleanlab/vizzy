import React from 'react'
import { Heading, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { LabelIssue } from '../issues/types'
import ConfidentJointMatrix from './ConfidentJointMatrix'

interface ConfidentJointProps {
  labels: Array<string>
  issues: Record<string, LabelIssue>
  activeImageId: string
  activeImageIdDispatch: any
}

const ConfidentJoint = (props: ConfidentJointProps) => {
  const { labels, issues, activeImageId, activeImageIdDispatch } = props
  return (
    <Stack
      align={'center'}
      width={'100%'}
      spacing={0}
      bgColor={useColorModeValue('gray.100', 'gray.700')}
      p={2}
      pt={1}
      rounded={'md'}
      className={'tour-confident-joint'}
    >
      <HStack>
        <Text>3.</Text>
        <Heading size={'sm'} fontWeight={500}>
          CONFIDENT JOINT MATRIX
        </Heading>
      </HStack>
      <ConfidentJointMatrix
        labels={labels}
        issues={issues}
        activeImageId={activeImageId}
        activeImageIdDispatch={activeImageIdDispatch}
      />
    </Stack>
  )
}

export default ConfidentJoint
