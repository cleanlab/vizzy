export interface PredProbsProps {
  data: Record<string, PredProbsEntryProps>
}

export interface PredProbsEntryProps {
  id: string
  src: string
  probabilities: Array<number>
}
