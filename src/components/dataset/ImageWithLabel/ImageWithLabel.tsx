import React from 'react'
import { Box, HStack, Image, RadioGroup, useRadioGroup } from '@chakra-ui/react'
import { RadioCard } from './RadioCard'
import { ImageWithLabelProps } from '../types'
import './ImageWithLabel.css'
import placeholder from '../../../assets/placeholder.png'

const ImageWithLabel = (props: ImageWithLabelProps) => {
  const { id, givenLabel, classes, updateLabel, setActiveImageId, ...imageProps } = props

  const handleChange = (value) => {
    updateLabel(id, value)
  }
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'select-label',
    defaultValue: givenLabel,
    onChange: handleChange,
  })

  const group = getRootProps()

  return (
    <Box
      position={'relative'}
      onMouseEnter={() => setActiveImageId(id)}
      className={'tour-label-selection'}
    >
      <RadioGroup
        backgroundColor={'rgba(255,255,255,0.6)'}
        color={'black'}
        width={'100%'}
        maxWidth={'100%'}
        bottom={'0px'}
        right={'0px'}
        position={'absolute'}
        overflowX={'auto'}
      >
        <HStack {...group} width={'100%'} maxWidth={'100%'} justifyContent="center">
          {classes.map((value) => {
            const radio = getRadioProps({ value })
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            )
          })}
        </HStack>
      </RadioGroup>

      <Image {...imageProps} loading={'lazy'} fallbackSrc={placeholder} />
    </Box>
  )
}

export default ImageWithLabel
