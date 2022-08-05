import React from 'react'
import { Heading, HStack, Icon, Stack, useColorModeValue } from '@chakra-ui/react'
import { LabelIssue } from '../issues/types'
import ConfidentJointMatrix from './ConfidentJointMatrix'
import { RiNumber3 } from 'react-icons/ri'

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
      <HStack>
        <Icon as={RiNumber3} />
        <Heading size={'sm'} fontWeight={500}>
          CONFIDENT JOINT MATRIX
        </Heading>
      </HStack>
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
