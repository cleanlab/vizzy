export interface PredProbsProps {
  data: Record<string, PredProbsEntryProps>
  classes: Array<string>
  classPercentile: number
  setClassPercentile: (number) => void
  OODPercentile: number
  setOODPercentile: (number) => void
  setActiveImageId: (string) => void
  populatePredProbs: () => void
}

export interface PredProbsEntryProps {
  id: string
  src: string
  givenLabel: string
  probabilities: Array<number>
}
