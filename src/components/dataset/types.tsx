import { ImageProps } from '@chakra-ui/react'

export interface Datapoint {
  id: string
  src: string
  givenLabel: string
  embedding: Array<number>
  classes: Array<string>
}

export interface DatasetInterfaceProps {
  data: Record<string, Datapoint>
  classes: Array<string>
  updateLabel: (string, label) => void
  setActiveImageId: (imageId: string) => void
}

export interface ImageWithLabelProps extends ImageProps {
  id: string
  givenLabel: string
  classes: string[]
  updateLabel: (string, Datapoint) => void
  setActiveImageId: (imageId: string) => void
}
