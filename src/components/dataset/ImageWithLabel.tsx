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
import { ImageWithLabelProps } from './types'
import { BiChevronDown } from 'react-icons/bi'

const ImageWithLabel = (props: ImageWithLabelProps) => {
  const { givenLabel, labelOptions } = props
  return (
    <Box position={'relative'}>
      <Menu>
        <Button
          // colorScheme={useColorModeValue('blackAlpha', 'blackAlpha')}
          backgroundColor={'white'}
          opacity={'50%'}
          color={'black'}
          size={'xs'}
          bottom={'0px'}
          right={'0px'}
          position={'absolute'}
          maxWidth={'100%'}
          rightIcon={<BiChevronDown />}
        >
          <Text noOfLines={1}>{givenLabel}</Text>
        </Button>
      </Menu>

      <Image src={props.src} {...props} />
    </Box>
  )
}

export default ImageWithLabel
