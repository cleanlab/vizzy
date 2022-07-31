import React from 'react'
import { Box, Flex, Grid, GridItem, HStack, Tag, VStack } from '@chakra-ui/react'
import LabelIssueImage from '../results/LabelIssueImage'
import { LabelIssue } from '../results/types'

interface ConfidentJointProps {
  labels: Array<string>
  issues: Record<string, LabelIssue>
  activeImageId: string
  setActiveImageId: (string) => void
}

const ConfidentJointMatrix = (props: ConfidentJointProps) => {
  const { labels, issues, activeImageId, setActiveImageId } = props
  const gridLength = 'calc(max(60vh, 500px))'
  const tagSizePercent = '7%'
  const cellSizePercent = '31%'

  const renderImageGrid = (givenLabel, suggestedLabel) => {
    return (
      <Grid templateColumns="repeat(10, 1fr)" gap={1} p={1} overflowY={'auto'} maxHeight={'155px'}>
        {Object.values(issues).map(
          (datapoint) =>
            datapoint['givenLabel'] === givenLabel &&
            datapoint['suggestedLabel'] === suggestedLabel && (
              <GridItem key={datapoint.id} height={'fit-content'}>
                <LabelIssueImage
                  {...datapoint}
                  id={datapoint.id}
                  activeImageId={activeImageId}
                  setActiveImageId={setActiveImageId}
                />
              </GridItem>
            )
        )}
      </Grid>
    )
  }

  return (
    <VStack spacing={0} h={gridLength}>
      <HStack w={gridLength} h={tagSizePercent} spacing={0}>
        <Box w={tagSizePercent}> </Box>
        {labels.map((label) => (
          <Flex w={cellSizePercent} justify={'center'}>
            <Tag colorScheme={'yellow'} size={'sm'}>
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
          >
            <Tag colorScheme={'blue'} size={'sm'} minWidth={'max-content'}>
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
              {issues && renderImageGrid(labels[rowIdx], labels[columnIdx])}
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  )
}

export default ConfidentJointMatrix
