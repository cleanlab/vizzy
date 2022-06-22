import React from 'react'
import { Grid, GridItem, VStack, Tag, HStack } from '@chakra-ui/react'
import { LabelIssue } from '../results/types'
import ConfidentJointMatrix from './ConfidentJointMatrix'

interface ConfidentJointProps {
  labels: Array<string>
  issues: Record<string, LabelIssue>
  setActiveImageId: (string) => void
}

const ConfidentJointGrid = (props: ConfidentJointProps) => {
  const { labels, issues, setActiveImageId } = props
  return (
    <HStack width={'100%'} height={'100%'} spacing={3}>
      <Grid alignItems="center" height={'100%'} justifyItems={'flex-end'} width={'8%'}>
        {labels.map((label) => (
          <GridItem key={label}>
            <Tag colorScheme={'blue'} size={'sm'} transform={'rotate(270deg)'} width={'100px'}>
              {`given: ${label}`}
            </Tag>
          </GridItem>
        ))}
      </Grid>
      <VStack width={'92%'} height={'100%'}>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} h="5" width={'100%'} justifyItems="center">
          {labels.map((label) => (
            <GridItem>
              <Tag colorScheme={'yellow'} size={'sm'}>
                {`suggested: ${label}`}
              </Tag>
            </GridItem>
          ))}
        </Grid>
        <ConfidentJointMatrix issues={issues} setActiveImageId={setActiveImageId} labels={labels} />
      </VStack>
    </HStack>
  )
}

export default ConfidentJointGrid
