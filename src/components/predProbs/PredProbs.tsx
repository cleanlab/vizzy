import React from 'react'
import { VStack, Heading, Flex, Box, Text, HStack, IconButton, Tooltip } from '@chakra-ui/react'
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
    predProbsComputing,
    setPredProbsComputing,
  } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <HStack>
        <Tooltip label={'Train a model on the data!'} hasArrow>
          <IconButton
            fontSize={'30px'}
            color="teal"
            aria-label={'compute pred probs'}
            icon={<AiFillPlayCircle />}
            isLoading={predProbsComputing}
            variant={'unstyled'}
            onClick={() => {
              setPredProbsComputing(true)
              populatePredProbs()
            }}
          />
        </Tooltip>
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
        <Box
          width={'100%'}
          borderWidth={'2px'}
          borderColor={'teal.400'}
          borderRadius={'lg'}
          padding={'10px'}
        >
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
