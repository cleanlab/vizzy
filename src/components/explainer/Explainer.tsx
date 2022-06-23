import React from 'react'
import {
  Box,
  chakra,
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
import util from '../../model/util'
import Explanation from './Explanation'

interface ExplainerProps {
  imageDataset: Record<string, Datapoint>
  predProbsData: Record<string, PredProbsEntryProps>
  classThresholds: Record<string, number>
  OODThresholds: Record<string, number>
  classes: Array<string>
  classPercentile: number
  OODPercentile: number
  issues: Record<string, LabelIssue>
  OODData: Record<string, LabelIssue>
  activeImageId: string
}

const Explainer = (props: ExplainerProps) => {
  const {
    imageDataset,
    predProbsData,
    classThresholds,
    OODThresholds,
    classes,
    classPercentile,
    OODPercentile,
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
  const predictedClass = classes[util.argMax(predProbs.probabilities)]
  const predictedClassProb = Math.max(...predProbs.probabilities)
  const isIssue = issues ? Object.keys(issues).includes(activeImageId) : false
  const issueEntry = issues ? issues[activeImageId] : null
  const isOOD = OODData ? Object.keys(OODData).includes(activeImageId) : false
  const OODEntry = OODData ? OODData[activeImageId] : null
  const datapoint = imageDataset[activeImageId]

  return (
    <HStack height={'100%'} width={'100%'} justify={'flex-start'} p={4}>
      <Image height={'100%'} src={datapoint.src} />
      <VStack align={'flex-start'} justify={'flex-start'} height={'100%'}>
        {predProbs && (
          <>
            <TableContainer overflowY={'auto'} height={'100%'}>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    {classes.map((c) => (
                      <Th key={c} isNumeric>
                        {c}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    {predProbs.probabilities.map((v, idx) => (
                      <Td key={idx}>{v.toFixed(3)}</Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Text fontSize={'sm'}>
              The model predicts that is a{' '}
              <chakra.span fontWeight={600}>{predictedClass}</chakra.span> with probability{' '}
              <chakra.span fontWeight={600}>{predictedClassProb.toFixed(3)}</chakra.span>.
            </Text>
            <Explanation
              datapoint={datapoint}
              classes={classes}
              predProbs={predProbs}
              classPercentile={classPercentile}
              classThresholds={classThresholds}
              OODPercentile={OODPercentile}
              OODThresholds={OODThresholds}
              isOOD={isOOD}
            />
          </>
        )}
        <HStack>
          <Tag colorScheme={'blue'} size={'md'}>
            Given label
          </Tag>
          <Text fontSize={'sm'}>{datapoint.givenLabel}</Text>
        </HStack>

        {!isOOD && (
          <HStack>
            <Tag colorScheme={'yellow'} size={'md'}>
              Suggested label
            </Tag>
            {isIssue && issueEntry && <Text fontSize={'sm'}>{issueEntry.suggestedLabel}</Text>}
            {!isIssue && <Text fontSize={'sm'}>{datapoint.givenLabel}</Text>}
          </HStack>
        )}
        {isOOD && OODEntry && (
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
