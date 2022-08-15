import React from 'react'
import { Box, Image, Tag, Flex } from '@chakra-ui/react'

interface ExplainerImageProps {
  src: string
  givenLabel: string
  suggestedLabel: string
  isOOD: boolean
}

const ExplainerImage = (props: ExplainerImageProps) => {
  const { src, givenLabel, suggestedLabel, isOOD } = props

  const renderSuggestedTag = () => {
    return (
      <Flex justify="flex-end">
        <Tag
          backgroundColor={'yellow.100'}
          color={'yellow.800'}
          size={'md'}
          position={'absolute'}
          bottom={'0px'}
          marginRight={'1.5'}
          marginBottom={'1.5'}
        >
          {`suggested: ${suggestedLabel}`}
        </Tag>
      </Flex>
    )
  }

  const renderOODTag = () => {
    return (
      <Flex justify="flex-end">
        <Tag
          backgroundColor={'red.100'}
          color={'red.800'}
          size={'md'}
          position={'absolute'}
          bottom={'0px'}
          marginRight={'1.5'}
          marginBottom={'1.5'}
        >
          out-of-distribution
        </Tag>
      </Flex>
    )
  }

  return (
    <Box position={'relative'}>
      <Image src={src} />
      <Flex justify="flex-start">
        <Tag
          backgroundColor={'blue.100'}
          color={'blue.800'}
          size={'md'}
          position={'absolute'}
          bottom={'0px'}
          marginLeft={'1.5'}
          marginBottom={'1.5'}
        >
          {`given: ${givenLabel}`}
        </Tag>
      </Flex>
      {isOOD ? renderOODTag() : renderSuggestedTag()}
    </Box>
  )
}

export default ExplainerImage
