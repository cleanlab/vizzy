import React from 'react'
import { Box, Flex, HStack, Tag, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { LabelIssue } from '../issues/types'
import ImageGrid from './ImageGrid'

interface ConfidentJointProps {
  labels: Array<string>
  issues: Record<string, LabelIssue>
  activeImageId: string
  setActiveImageId: (imageId: string) => void
}

const ConfidentJointMatrix = (props: ConfidentJointProps) => {
  const { labels, issues, activeImageId, setActiveImageId } = props
  const gridLength = 'calc(max(33.5rem, 34vw))'
  const cellSizePercent = '33%'
  const errorCellColor = useColorModeValue('red.100', 'red.900')

  return (
    <VStack spacing={0} align={'flex-end'}>
      <HStack w={gridLength} spacing={0}>
        {labels.map((label) => (
          <Flex key={label} w={cellSizePercent} justify={'center'} mb={'2px'}>
            <Tag colorScheme={'yellow'} size={'md'}>
              {`suggested: ${label}`}
            </Tag>
          </Flex>
        ))}
      </HStack>
      <VStack spacing={0} h={gridLength}>
        {[0, 1, 2].map((rowIdx) => (
          <HStack key={rowIdx} spacing={0} height={cellSizePercent}>
            <Flex justify={'center'} align={'flex-end'} mr={'2px'}>
              <Tag colorScheme={'blue'} size={'md'} minWidth={'max-content'}>
                <VStack spacing={0}>
                  <Text>given:</Text>
                  <Text>{labels[rowIdx]}</Text>
                </VStack>
              </Tag>
            </Flex>
            <HStack spacing={0} w={gridLength} h={'100%'}>
              {[0, 1, 2].map((columnIdx) => {
                const suggestedLabel = labels[columnIdx]
                const givenLabel = labels[rowIdx]
                const activeIssue = activeImageId && issues[activeImageId]
                // if the active image ID doesn't fall within this grid, it doesn't
                // need to know about it, improving memoization
                const localActiveImageId =
                  activeImageId &&
                  activeIssue.givenLabel === givenLabel &&
                  activeIssue.suggestedLabel === suggestedLabel
                    ? activeImageId
                    : null
                return (
                  <Box
                    key={columnIdx}
                    borderWidth={'0.5px'}
                    m={0}
                    borderColor={'gray.500'}
                    bgColor={issues && rowIdx !== columnIdx ? errorCellColor : null}
                    w={cellSizePercent}
                    h={'100%'}
                  >
                    {issues && (
                      <ImageGrid
                        suggestedLabel={suggestedLabel}
                        givenLabel={givenLabel}
                        activeImageId={localActiveImageId}
                        setActiveImageId={setActiveImageId}
                        issues={issues}
                      />
                    )}
                  </Box>
                )
              })}
            </HStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  )
}

export default ConfidentJointMatrix
