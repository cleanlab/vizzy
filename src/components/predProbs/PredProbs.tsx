import React from 'react'
import { VStack, Heading, Flex, Box, Text } from '@chakra-ui/react'
import { PredProbsEntryProps, PredProbsProps } from './types'
import PredProbsTable from './PredProbsTable'
import PercentileSlider from './PercentileSlider'

const PredProbs = (props: PredProbsProps) => {
  const { data, classPercentile, setClassPercentile, setActiveImageId } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <Heading size={'sm'} fontWeight={500}>
        PREDICTED PROBABILITIES
      </Heading>
      {!data && (
        <Flex width={'100%'} height={'100%'} justify={'center'} align={'center'}>
          <Text fontSize={'sm'} fontStyle={'italic'}>
            Nothing computed.
          </Text>
        </Flex>
      )}
      {data && (
        <>
          <PredProbsTable data={Object.values(data)} setActiveImageId={setActiveImageId} />
          <Box>
            <PercentileSlider percentile={classPercentile} setPercentile={setClassPercentile} />
          </Box>
        </>
      )}
    </VStack>
  )
}

export default PredProbs
