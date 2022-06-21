import React from 'react'
import { Box, Flex, HStack, Image, Tag, Text } from '@chakra-ui/react'
import { ImageWithLabelProps } from '../dataset/types'
import { LabelIssue } from '../results/types'

interface ExplainerProps {
  datapoint: LabelIssue
}

const Explainer = (props) => {
  const { datapoint } = props

  if (!datapoint) {
    return (
      <Flex height={'100%'} width={'100%'} justify={'center'} align={'center'}>
        <Text fontSize={'sm'} fontStyle={'italic'}>
          Nothing to show.
        </Text>
      </Flex>
    )
  }

  return (
    <HStack height={'100%'} width={'100%'} align={'center'} justify={'flex-start'}>
      <Image height={'100%'} src={datapoint.src} />
      <Tag colorScheme={'blue'} opacity={'80%'} size={'sm'}>
        Given: {datapoint.givenLabel}
      </Tag>
      <Tag colorScheme={'yellow'} opacity={'80%'} size={'sm'}>
        Suggested: {datapoint.suggestedLabel}
      </Tag>
    </HStack>
  )
}

export default Explainer
