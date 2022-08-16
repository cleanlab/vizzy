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
  imageDatasetDispatch: any
  activeImageIdDispatch: any
}

export interface DatasetImageProps extends ImageProps {
  id: string
  givenLabel: string
  classes: string[]
  imageDatasetDispatch: any
  activeImageIdDispatch: any
}
