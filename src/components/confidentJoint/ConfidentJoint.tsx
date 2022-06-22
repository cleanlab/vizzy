import React from 'react'
import { Heading, Stack } from '@chakra-ui/react'
// import ConfidentJointHeatmap from './ConfidentJointHeatmap'
import ConfidentJointGrid from './ConfidentJointGrid'
import { LabelIssue } from '../results/types'

interface ConfidentJointProps {
  labels: Array<string>
  issues: Record<string, LabelIssue>
  setActiveImageId: (string) => void
}

const ConfidentJointMatrix = (props: ConfidentJointProps) => {
  const { labels, issues, setActiveImageId } = props
  return (
    <Stack align={'center'} height={'100%'} width={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        CONFIDENT JOINT MATRIX
      </Heading>
      {/* <ConfidentJointHeatmap /> */}
      <ConfidentJointGrid labels={labels} issues={issues} setActiveImageId={setActiveImageId} />
    </Stack>
  )
}

export default ConfidentJointMatrix