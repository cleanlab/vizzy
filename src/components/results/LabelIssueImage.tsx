import React from 'react'
import { Box, Image, Tag, VStack } from '@chakra-ui/react'
import { LabelIssueImageProps } from './types'

const LabelIssueImage = (props: LabelIssueImageProps) => {
  const { id, givenLabel, suggestedLabel, setActiveImageId, ...imageProps } = props
  return (
    <Box position={'relative'} onMouseEnter={() => setActiveImageId(id)}>
      <Image {...imageProps} rounded={'md'} />
    </Box>
  )
}

export default LabelIssueImage
