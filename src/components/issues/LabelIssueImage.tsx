import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import { LabelIssueImageProps } from './types'

const LabelIssueImage = (props: LabelIssueImageProps) => {
  const { id, givenLabel, suggestedLabel, isActive, setActiveImageId, OOD, ...imageProps } = props
  if (isActive) {
    return (
      <Box position={'relative'} opacity={'85%'} onMouseEnter={() => setActiveImageId(id)}>
        <Image {...imageProps} rounded={'md'} />
      </Box>
    )
  } else {
    return (
      <Box position={'relative'} onMouseEnter={() => setActiveImageId(id)}>
        <Image {...imageProps} rounded={'md'} />
      </Box>
    )
  }
}

export default React.memo(LabelIssueImage)
