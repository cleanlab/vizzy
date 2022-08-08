import { ImageProps } from '@chakra-ui/react'

export interface LabelIssue {
  id: string
  src: string
  givenLabel: string
  suggestedLabel: string
}

export interface LabelIssueImageProps extends ImageProps {
  id: string
  givenLabel: string
  suggestedLabel: string
  isActive: boolean
  setActiveImageId: (string) => void
}
