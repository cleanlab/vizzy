import React from 'react'
import {
  Box,
  Button,
  Flex,
  Image,
  ImageProps,
  Menu,
  Portal,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ImageWithLabelProps } from '../types'
import { BiChevronDown } from 'react-icons/bi'
import './ImageWithLabel.css'

const ImageWithLabel = (props: ImageWithLabelProps) => {
  const { givenLabel, labelOptions, ...imageProps } = props
  return (
    <Box position={'relative'}>
      <Select
        // colorScheme={useColorModeValue('blackAlpha', 'blackAlpha')}
        backgroundColor={'white'}
        opacity={'50%'}
        color={'black'}
        size={'xs'}
        bottom={'0px'}
        right={'0px'}
        position={'absolute'}
        maxWidth={'100%'}
        overflowX={'auto'}
        defaultValue={givenLabel}
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
