import React from 'react'
import { VStack, Heading, Flex, Box, HStack, Tooltip, Icon } from '@chakra-ui/react'
import { PredProbsProps } from './types'
import PredProbsTable from './PredProbsTable'
import { AiFillPlayCircle } from 'react-icons/all'

const PredProbs = (props: PredProbsProps) => {
  const { data, classes, setActiveImageId, populatePredProbs } = props

  return (
    <VStack width={'100%'} height={'100%'}>
      <HStack>
        <Tooltip label={'Train a model on the data!'} hasArrow>
          <Flex>
            <Icon
              fontSize={'60px'}
              color="teal"
              aria-label={'compute pred probs'}
              as={AiFillPlayCircle}
              // variant={'unstyled'}
              _hover={{ cursor: 'pointer' }}
              onClick={() => {
                populatePredProbs()
              }}
            />
          </Flex>
        </Tooltip>
        <Heading size={'sm'} fontWeight={500}>
          PREDICTED PROBABILITIES
        </Heading>
      </HStack>

      <PredProbsTable
        data={data ? Object.values(data) : []}
        classes={classes}
        setActiveImageId={setActiveImageId}
      />
    </VStack>
  )
}

export default PredProbs
