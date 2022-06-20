import React from 'react'
import { Box, Image, Tag, VStack } from '@chakra-ui/react'
import { LabelIssueImageProps } from './types'

const LabelIssueImage = (props: LabelIssueImageProps) => {
  const { id, givenLabel, suggestedLabel, setActiveImageId, ...imageProps } = props
  return (
    <Box position={'relative'} onMouseEnter={() => setActiveImageId(id)}>
      {/*<VStack*/}
      {/*  position={'absolute'}*/}
      {/*  bottom={'0px'}*/}
      {/*  right={'0px'}*/}
      {/*  spacing={'0rem'}*/}
      {/*  align={'flex-start'}*/}
      {/*>*/}
      {/*  <Tag colorScheme={'blue'} opacity={'80%'} size={'sm'}>*/}
      {/*    Given: {givenLabel}*/}
      {/*  </Tag>*/}
      {/*  <Tag colorScheme={'yellow'} opacity={'80%'} size={'sm'}>*/}
      {/*    Suggested: {suggestedLabel}*/}
      {/*  </Tag>*/}
      {/*</VStack>*/}

      <Image {...imageProps} rounded={'md'} />
    </Box>
  )
}

export default LabelIssueImage
