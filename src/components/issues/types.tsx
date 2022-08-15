import { ImageProps } from '@chakra-ui/react'

export interface LabelIssue {
  id: string
  src: string
  givenLabel: string
  suggestedLabel: string
  OOD: boolean
}

export interface LabelIssueImageProps extends ImageProps {
  id: string
  givenLabel: string
  showGivenLabel?: boolean
  suggestedLabel: string
  OOD: boolean
  isActive: boolean
  setActiveImageId: (string) => void
}
