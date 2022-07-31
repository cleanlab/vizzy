import React from 'react'
import { Grid, GridItem, VStack, Tag, HStack } from '@chakra-ui/react'
import { LabelIssue } from '../results/types'
import ConfidentJointMatrix from './ConfidentJointMatrix'

interface ConfidentJointProps {
  labels: Array<string>
  issues: Record<string, LabelIssue>
  activeImageId: string
  setActiveImageId: (string) => void
}

const ConfidentJointGrid = (props: ConfidentJointProps) => {
  // const { labels, issues, activeImageId, setActiveImageId } = props
  return <ConfidentJointMatrix {...props} />
}

export default ConfidentJointGrid
