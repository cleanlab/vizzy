import { ImageProps } from '@chakra-ui/react'

export interface Datapoint {
  id: string
  src: string
  givenLabel: string
  labelOptions: Array<string>
}

export interface DatasetInterfaceProps {
  data: Record<string, Datapoint>
}

export interface ImageWithLabelProps extends ImageProps {
  givenLabel: string
  labelOptions: string[]
}
