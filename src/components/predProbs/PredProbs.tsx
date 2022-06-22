import React from 'react'
import { VStack, Heading, Flex, Box, Text, HStack, IconButton } from '@chakra-ui/react'
import { PredProbsEntryProps, PredProbsProps } from './types'
import PredProbsTable from './PredProbsTable'
import PercentileSlider from './PercentileSlider'
import { AiFillPlayCircle } from 'react-icons/all'

const PredProbs = (props: PredProbsProps) => {
  const {
    data,
    classes,
    classPercentile,
    setClassPercentile,
    OODPercentile,
    setOODPercentile,
    setActiveImageId,
    populatePredProbs,
  } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <HStack>
        <IconButton
          size={'lg'}
          aria-label={'compute pred probs'}
          icon={<AiFillPlayCircle />}
          variant={'unstyled'}
          onClick={populatePredProbs}
        />
        <Heading size={'sm'} fontWeight={500}>
          PREDICTED PROBABILITIES
        </Heading>
      </HStack>

      <>
        <PredProbsTable
          data={data ? Object.values(data) : []}
          classes={classes}
          setActiveImageId={setActiveImageId}
        />
        <Box width={'90%'}>
          <PercentileSlider
            name={'Class percentile'}
            percentile={classPercentile}
            setPercentile={setClassPercentile}
          />
          <PercentileSlider
            name={'Out-of-distribution percentile'}
            percentile={OODPercentile}
            setPercentile={setOODPercentile}
          />
        </Box>
      </>
    </VStack>
  )
}

export default PredProbs
