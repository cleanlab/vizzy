import React from 'react'
import { Box, Flex, Image, Tag } from '@chakra-ui/react'

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
      <Flex justify="flex-end" pr={'1.5'}>
        <Tag
          backgroundColor={'yellow.100'}
          color={'yellow.800'}
          size={'md'}
          position={'absolute'}
          bottom={'0px'}
          marginBottom={'1.5'}
          minWidth={'fit-content'}
        >
          {`suggested: ${suggestedLabel}`}
        </Tag>
      </Flex>
    )
  }

  const renderOODTag = () => {
    return (
      <Flex justify="flex-end" pr={'1.5'}>
        <Tag
          backgroundColor={'red.100'}
          color={'red.800'}
          size={'md'}
          position={'absolute'}
          bottom={'0px'}
          marginRight={'1.5'}
          marginBottom={'1.5'}
          minWidth={'fit-content'}
        >
          out-of-distribution
        </Tag>
      </Flex>
    )
  }

  return (
    <Box position={'relative'} h={'100%'} w={'fit-content'}>
      <Image src={src} h={'100%'} />
      <Flex justify="flex-start" pl={'1.5'}>
        <Tag
          backgroundColor={'purple.100'}
          color={'purple.800'}
          size={'md'}
          position={'absolute'}
          bottom={'0px'}
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
