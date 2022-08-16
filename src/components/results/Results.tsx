import React from 'react'
import { Box, useColorModeValue, VStack } from '@chakra-ui/react'
import Issues from '../issues/Issues'
import OutOfDistribution from '../ood/OutOfDistribution'
import { LabelIssue } from '../issues/types'

interface ResultsProps {
  issues: Record<string, LabelIssue>
  activeImageId: string
  activeImageIdDispatch: any
  OODData: Record<string, LabelIssue>
}

const Results = (props: ResultsProps) => {
  const { issues, activeImageId, activeImageIdDispatch, OODData } = props

  return (
    <VStack
      w={'100%'}
      h={'100%'}
      bgColor={useColorModeValue('gray.100', 'gray.700')}
      p={2}
      rounded={'md'}
      className={'tour-results'}
    >
      <Box height={'50%'} width={'100%'}>
        <Issues
          issues={issues}
          activeImageId={activeImageId}
          activeImageIdDispatch={activeImageIdDispatch}
        />
      </Box>
      <Box height={'50%'} width={'100%'}>
        <OutOfDistribution
          issues={OODData}
          activeImageId={activeImageId}
          activeImageIdDispatch={activeImageIdDispatch}
        />
      </Box>
    </VStack>
  )
}

export default Results
