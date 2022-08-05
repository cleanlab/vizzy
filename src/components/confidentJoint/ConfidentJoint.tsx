import React from 'react'
import { Heading, Stack, useColorModeValue } from '@chakra-ui/react'
import { LabelIssue } from '../results/types'
import ConfidentJointMatrix from './ConfidentJointMatrix'

interface ConfidentJointProps {
  labels: Array<string>
  issues: Record<string, LabelIssue>
  activeImageId: string
  setActiveImageId: (string) => void
}

const ConfidentJoint = (props: ConfidentJointProps) => {
  const { labels, issues, activeImageId, setActiveImageId } = props
  return (
    <Stack
      align={'center'}
      height={'100%'}
      width={'100%'}
      spacing={0}
      bgColor={useColorModeValue('purple.50', 'purple.900')}
      p={2}
      rounded={'md'}
    >
      <Heading size={'sm'} fontWeight={500}>
        CONFIDENT JOINT MATRIX
      </Heading>
      <ConfidentJointMatrix
        labels={labels}
        issues={issues}
        activeImageId={activeImageId}
        setActiveImageId={setActiveImageId}
      />
    </Stack>
  )
}

export default ConfidentJoint
