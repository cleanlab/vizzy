import { ImageProps } from '@chakra-ui/react'

export interface Datapoint {
  id: string
  src: string
  givenLabel: string
  labelOptions: Array<string>
}

export interface DatasetInterfaceProps {
  data: Record<string, Datapoint>
  updateLabel: (string, label) => void
}

export interface ImageWithLabelProps extends ImageProps {
  id: string
  givenLabel: string
  labelOptions: string[]
  updateLabel: (string, Datapoint) => void
}
