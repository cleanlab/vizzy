import React from 'react'
import { Box, Image, Select } from '@chakra-ui/react'
import { ImageWithLabelProps } from '../types'
import './ImageWithLabel.css'

const ImageWithLabel = (props: ImageWithLabelProps) => {
  const { id, givenLabel, labelOptions, updateLabel, ...imageProps } = props
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
        <option key={givenLabel}>{givenLabel}</option>
        {labelOptions.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>

      <Image {...imageProps} />
    </Box>
  )
}

export default ImageWithLabel
