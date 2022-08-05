import React from 'react'
import { Box } from '@chakra-ui/react'
import Issues from '../issues/Issues'
import OutOfDistribution from '../ood/OutOfDistribution'
import { LabelIssue } from '../issues/types'

interface ResultsProps {
  issues: Record<string, LabelIssue>
  activeImageId: string
  setActiveImageId: (imageId: string) => void
  OODData: Record<string, LabelIssue>
}
const Results = (props) => {
  const { issues, activeImageId, setActiveImageId, OODData } = props

  return (
    <>
      <Box height={'50%'} width={'100%'}>
        <Issues issues={issues} activeImageId={activeImageId} setActiveImageId={setActiveImageId} />
      </Box>
      <Box height={'50%'} width={'100%'}>
        <OutOfDistribution
          issues={OODData}
          activeImageId={activeImageId}
          setActiveImageId={setActiveImageId}
        />
      </Box>
    </>
  )
}

export default Results
