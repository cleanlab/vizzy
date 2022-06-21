import React from 'react'
import { Heading, Stack } from '@chakra-ui/react'
// import ConfidentJointHeatmap from './ConfidentJointHeatmap'
import ConfidentJointGrid from './ConfidentJointGrid'

const ConfidentJointMatrix = (props) => {
  const { issues, setActiveImageId } = props
  return (
    <Stack align={'center'} height={'100%'} width={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        CONFIDENT JOINT MATRIX
      </Heading>
      {/* <ConfidentJointHeatmap /> */}
      <ConfidentJointGrid issues={issues} setActiveImageId={setActiveImageId} />
    </Stack>
  )
}

export default ConfidentJointMatrix
