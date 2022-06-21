import React from 'react'
import {
  Box,
  Flex,
  HStack,
  Image,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { Datapoint, ImageWithLabelProps } from '../dataset/types'
import { LabelIssue } from '../results/types'
import { PredProbsEntryProps } from '../predProbs/types'
import PredProbsTable from '../predProbs/PredProbsTable'
import PredProbsTableRow from '../predProbs/PredProbsTableRow'

interface ExplainerProps {
  imageDataset: Record<string, Datapoint>
  predProbsData: Record<string, PredProbsEntryProps>
  thresholds: Record<string, number>
  classes: Array<String>
  classPercentile: number
  issues: Record<string, LabelIssue>
  OODData: Record<string, LabelIssue>
  activeImageId: string
}

const Explainer = (props: ExplainerProps) => {
  const {
    imageDataset,
    predProbsData,
    thresholds,
    classes,
    classPercentile,
    issues,
    OODData,
    activeImageId,
  } = props
  if (!activeImageId) {
    return (
      <Flex height={'100%'} width={'100%'} justify={'center'} align={'center'}>
        <Text fontSize={'sm'} fontStyle={'italic'}>
          {/*Nothing to show.*/}
        </Text>
      </Flex>
    )
  }
  const predProbs = predProbsData[activeImageId]
  const isIssue = issues ? Object.keys(issues).includes(activeImageId) : false
  const issueEntry = issues[activeImageId]
  const isOOD = OODData ? Object.keys(OODData).includes(activeImageId) : false
  const OODEntry = OODData[activeImageId]
  const datapoint = imageDataset[activeImageId]
  console.log('isIssue', isIssue)
  console.log('isOOD', isOOD)
  console.log('activeImageId', activeImageId)
  console.log('Object.keys(OODData)', Object.keys(OODData))

  return (
    <HStack height={'100%'} width={'100%'} justify={'flex-start'}>
      <Image height={'100%'} src={datapoint.src} />
      <VStack align={'flex-start'} justify={'flex-start'} height={'100%'}>
        {predProbs && (
          <TableContainer overflowY={'auto'} height={'100%'}>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  {classes.map((c) => (
                    <Th isNumeric>{c}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  {predProbs.probabilities.map((v, idx) => (
                    <Td key={idx}>{v}</Td>
                  ))}
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
        <HStack>
          <Tag colorScheme={'blue'} size={'md'}>
            Given label
          </Tag>
          <Text fontSize={'sm'}>{datapoint.givenLabel}</Text>
        </HStack>

        {isIssue && (
          <HStack>
            <Tag colorScheme={'yellow'} size={'md'}>
              Suggested label
            </Tag>
            <Text fontSize={'sm'}>{issueEntry.suggestedLabel}</Text>
          </HStack>
        )}
        {isOOD && (
          <HStack>
            <Tag colorScheme={'red'} size={'md'}>
              Out of distribution
            </Tag>
            <Text fontSize={'sm'}>This example does not belong to any of the 3 classes.</Text>
          </HStack>
        )}
      </VStack>
    </HStack>
  )
}

export default Explainer
