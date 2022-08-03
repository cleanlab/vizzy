import React from 'react'
import { Box, Flex, Grid, GridItem, HStack, Tag, VStack } from '@chakra-ui/react'
import LabelIssueImage from '../results/LabelIssueImage'
import { LabelIssue } from '../results/types'
import ImageGrid from './ImageGrid'

interface ConfidentJointProps {
  labels: Array<string>
  issues: Record<string, LabelIssue>
  activeImageId: string
  setActiveImageId: (imageId: string) => void
}

const ConfidentJointMatrix = (props: ConfidentJointProps) => {
  const { labels, issues, activeImageId, setActiveImageId } = props
  const gridLength = 'calc(max(400px, min(64vh, 640px)))'
  const tagSizePercent = '4%'
  const cellSizePercent = '32%'

  return (
    <VStack spacing={0} h={gridLength}>
      <HStack w={gridLength} h={tagSizePercent} spacing={0}>
        <Box w={tagSizePercent}> </Box>
        {labels.map((label) => (
          <Flex w={cellSizePercent} justify={'center'} mb={'2px'}>
            <Tag colorScheme={'yellow'} size={'md'}>
              {`suggested: ${label}`}
            </Tag>
          </Flex>
        ))}
      </HStack>
      {[0, 1, 2].map((rowIdx) => (
        <HStack key={rowIdx} spacing={0} w={gridLength} h={cellSizePercent}>
          <Flex
            w={tagSizePercent}
            justify={'center'}
            align={'flex-end'}
            transform={'rotate(270deg)'}
            mr={'2px'}
          >
            <Tag colorScheme={'blue'} size={'md'} minWidth={'max-content'}>
              {`given: ${labels[rowIdx]}`}
            </Tag>
          </Flex>
          {[0, 1, 2].map((columnIdx) => (
            <Box
              borderWidth={'0.5px'}
              m={0}
              borderColor={'gray.500'}
              w={cellSizePercent}
              h={'100%'}
            >
              {issues && (
                <ImageGrid
                  suggestedLabel={labels[columnIdx]}
                  givenLabel={labels[rowIdx]}
                  activeImageId={activeImageId}
                  setActiveImageId={setActiveImageId}
                  issues={issues}
                />
              )}
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  )
}

export default ConfidentJointMatrix
