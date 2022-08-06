import React from 'react'
import {
  VStack,
  Heading,
  Flex,
  HStack,
  Tooltip,
  Icon,
  useColorModeValue,
  Text,
} from '@chakra-ui/react'
import { PredProbsProps } from './types'
import PredProbsTable from './PredProbsTable'
import { AiFillPlayCircle } from 'react-icons/ai'

const PredProbs = (props: PredProbsProps) => {
  const { data, classes, setActiveImageId, populatePredProbs } = props

  return (
    <VStack
      width={'100%'}
      height={'100%'}
      rounded={'md'}
      bgColor={useColorModeValue('blue.50', 'blue.900')}
      p={2}
    >
      <HStack w={'100%'} justify={'center'}>
        <Tooltip label={'Train an image classifier on your constructed dataset!'} hasArrow>
          <Flex>
            <Icon
              fontSize={'40px'}
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
        <Text fontSize={'md'}>Train the model in your browser!</Text>
      </HStack>
      <HStack>
        <Text>2</Text>
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
