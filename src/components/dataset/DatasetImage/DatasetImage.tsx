import React from 'react'
import { Box, HStack, Image, RadioGroup, useRadioGroup } from '@chakra-ui/react'
import { RadioCard } from './RadioCard'
import { DatasetImageProps } from '../types'
import './DatasetImage.css'
import placeholder from '../../../assets/placeholder.png'

const DatasetImage = (props: DatasetImageProps) => {
  const { id, givenLabel, classes, imageDatasetDispatch, activeImageIdDispatch, ...imageProps } =
    props

  const handleChange = (value) => {
    imageDatasetDispatch({ type: 'updateDatasetLabel', id, label: value })
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
      onMouseEnter={() => activeImageIdDispatch({ type: 'setActiveImageId', id })}
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

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.givenLabel === nextProps.givenLabel
}

export default React.memo(DatasetImage, propsAreEqual)
