import React from 'react'
import { Box, Flex, Image, Tag, useColorModeValue } from '@chakra-ui/react'
import { LabelIssueImageProps } from './types'

const LabelIssueImage = (props: LabelIssueImageProps) => {
  const {
    id,
    givenLabel,
    showGivenLabel,
    suggestedLabel,
    isActive,
    setActiveImageId,
    OOD,
    ...imageProps
  } = props

  const activeBorderColor = useColorModeValue('gray.800', 'gray.100')

  const renderImage = () => {
    if (showGivenLabel) {
      return (
        <Flex justify="flex-start">
          <Tag
            backgroundColor={'blue.100'}
            color={'blue.800'}
            size={'sm'}
            position={'absolute'}
            bottom={'0px'}
            marginLeft={'0.5'}
            marginBottom={'0.5'}
          >
            {`${givenLabel}`}
          </Tag>
          <Image {...imageProps} rounded={'md'} />
        </Flex>
      )
    }
    return <Image {...imageProps} rounded={'md'} />
  }
  if (isActive) {
    return (
      <Box
        position={'relative'}
        onMouseEnter={() => setActiveImageId(id)}
        boxShadow={'lg'}
        borderWidth={'2px'}
        rounded={'md'}
        borderStyle={'solid'}
        borderColor={activeBorderColor}
      >
        {renderImage()}
      </Box>
    )
  } else {
    return (
      <Box position={'relative'} onMouseEnter={() => setActiveImageId(id)}>
        {renderImage()}
      </Box>
    )
  }
}

export default React.memo(LabelIssueImage)
