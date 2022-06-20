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
      {/*<Select*/}
      {/*  // colorScheme={useColorModeValue('blackAlpha', 'blackAlpha')}*/}
      {/*  backgroundColor={'white'}*/}
      {/*  opacity={'60%'}*/}
      {/*  color={'black'}*/}
      {/*  size={'sm'}*/}
      {/*  bottom={'0px'}*/}
      {/*  right={'0px'}*/}
      {/*  position={'absolute'}*/}
      {/*  maxWidth={'100%'}*/}
      {/*  overflowX={'auto'}*/}
      {/*  defaultValue={givenLabel}*/}
      {/*>*/}
      {/*  <option key={givenLabel}>{givenLabel}</option>*/}
      {/*  {labelOptions.map((v) => (*/}
      {/*    <option key={v}>{v}</option>*/}
      {/*  ))}*/}
      {/*</Select>*/}

      <Image {...imageProps} />
    </Box>
  )
}

export default LabelIssueImage
