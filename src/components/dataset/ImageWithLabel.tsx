import React from 'react'
import { Box, Image, ImageProps } from '@chakra-ui/react'
import { ImageWithLabelProps } from './types'

const ImageWithLabel = (props: ImageWithLabelProps) => {
  const { givenLabel, labelOptions } = props
  return (
    <Box>
      <Image src={props.src} {...props} />
    </Box>
  )
}

export default ImageWithLabel
