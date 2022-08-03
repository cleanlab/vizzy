export interface PredProbsProps {
  data: Record<string, PredProbsEntryProps>
  classes: Array<string>
  setActiveImageId: (string) => void
  populatePredProbs: () => void
}

export interface PredProbsEntryProps {
  id: string
  src: string
  givenLabel: string
  probabilities: Array<number>
}
