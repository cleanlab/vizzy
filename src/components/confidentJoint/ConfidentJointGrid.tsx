import React from 'react'
import { Grid, GridItem, VStack, Tag, HStack } from '@chakra-ui/react'
import { LabelIssue } from '../results/types'
import ConfidentJointMatrix from './ConfidentJointMatrix'

interface ConfidentJointProps {
  issues: Record<string, LabelIssue>
  setActiveImageId: (string) => void
}

const ConfidentJointGrid = (props: ConfidentJointProps) => {
  const { issues, setActiveImageId } = props
  const LABELS = ['cat', 'dog', 'mouse']
  return (
    <HStack width={'100%'} height={'100%'}>
      <Grid alignItems="center" height={'100%'}>
        {LABELS.map((label) => (
          <GridItem>
            <Tag colorScheme={'blue'} size={'sm'}>
              {`given: ${label}`}
            </Tag>
          </GridItem>
        ))}
      </Grid>
      <VStack width={'100%'} height={'100%'}>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} h="5" width={'100%'} justifyItems="center">
          {LABELS.map((label) => (
            <GridItem>
              <Tag colorScheme={'yellow'} size={'sm'}>
                {`suggested: ${label}`}
              </Tag>
            </GridItem>
          ))}
        </Grid>
        <ConfidentJointMatrix issues={issues} setActiveImageId={setActiveImageId} labels={LABELS} />
      </VStack>
    </HStack>
  )
}

export default ConfidentJointGrid
