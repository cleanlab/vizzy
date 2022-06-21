export interface PredProbsProps {
  data: Record<string, PredProbsEntryProps>
  classPercentile: number
  setClassPercentile: (number) => void
  setActiveImageId: (string) => void
}

export interface PredProbsEntryProps {
  id: string
  src: string
  probabilities: Array<number>
}
