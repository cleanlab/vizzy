import React from 'react'
import { Box, Image, Tag, VStack } from '@chakra-ui/react'
import { LabelIssueImageProps } from './types'

const LabelIssueImage = (props: LabelIssueImageProps) => {
  const { id, givenLabel, suggestedLabel, activeImageId, setActiveImageId, OOD, ...imageProps } = props
  if (id === activeImageId) {
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

export default LabelIssueImage
