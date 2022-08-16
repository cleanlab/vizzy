import { Datapoint } from '../dataset/types'

export interface PredProbsProps {
  data: Record<string, PredProbsEntryProps>
  classes: Array<string>
  activeImageIdDispatch: any
  populatePredProbs: () => Promise<void>
  labelsChanged: boolean
  setLabelsChanged: (labelsChanged: boolean) => void
  dataset: Record<string, Datapoint>
}

export interface PredProbsEntryProps {
  id: string
  src: string
  givenLabel: string
  probabilities: Array<number>
}
