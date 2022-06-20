export interface PredProbsProps {
  data: Record<string, PredProbsEntryProps>
  classPercentile: number
  setClassPercentile: (number) => void
}

export interface PredProbsEntryProps {
  id: string
  src: string
  probabilities: Array<number>
}
