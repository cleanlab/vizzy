import React from 'react'
import { Box, Image, Tag } from '@chakra-ui/react'
import { LabelIssueImageProps } from './types'

const LabelIssueImage = (props: LabelIssueImageProps) => {
  const { givenLabel, suggestedLabel, ...imageProps } = props
  return (
    <Box position={'relative'}>
      <Tag colorScheme={'blue'} bottom={'0px'} left={'0px'}>
        Given: {givenLabel}
      </Tag>
      <Tag colorScheme={'yellow'} bottom={'0px'} right={'0px'}>
        Suggested: {suggestedLabel}
      </Tag>
      <Image {...imageProps} />
    </Box>
  )
}

export default LabelIssueImage
