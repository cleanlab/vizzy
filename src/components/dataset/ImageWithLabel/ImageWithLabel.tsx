import React from 'react'
import { Box, Image, Select } from '@chakra-ui/react'
import { ImageWithLabelProps } from '../types'
import './ImageWithLabel.css'
import placeholder from '../../../assets/placeholder.png'

const ImageWithLabel = (props: ImageWithLabelProps) => {
  const { id, givenLabel, classes, updateLabel, ...imageProps } = props
  return (
    <Box position={'relative'}>
      <Select
        // colorScheme={useColorModeValue('blackAlpha', 'blackAlpha')}
        backgroundColor={'white'}
        opacity={'60%'}
        color={'black'}
        size={'sm'}
        bottom={'0px'}
        right={'0px'}
        position={'absolute'}
        maxWidth={'100%'}
        overflowX={'auto'}
        defaultValue={givenLabel}
        onChange={(evt) => {
          updateLabel(id, evt.target.value)
        }}
      >
        {classes.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>

      <Image {...imageProps} loading={'lazy'} fallbackSrc={placeholder} />
    </Box>
  )
}

export default ImageWithLabel
