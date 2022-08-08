import React from 'react'
import {
  Flex,
  Heading,
  HStack,
  Icon,
  keyframes,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { PredProbsProps } from './types'
import PredProbsTable from './PredProbsTable'
import { AiFillPlayCircle } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

const PredProbs = (props: PredProbsProps) => {
  const { data, classes, setActiveImageId, populatePredProbs } = props
  const [isTraining, setIsTraining] = React.useState(false)

  const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg)
    }
  `
  const spinAnimation = `${spin} infinite 1s linear`

  return (
    <VStack
      width={'100%'}
      height={'100%'}
      rounded={'md'}
      bgColor={useColorModeValue('blue.50', 'blue.900')}
      p={2}
    >
      <HStack>
        <Text>2.</Text>
        <Heading size={'sm'} fontWeight={500}>
          PREDICTED PROBABILITIES
        </Heading>
      </HStack>
      <HStack w={'100%'} justify={'center'}>
        <Tooltip label={'Train an image classifier on your constructed dataset!'} hasArrow>
          <Flex>
            <Icon
              fontSize={'60px'}
              color={useColorModeValue('teal.400', 'teal.200')}
              aria-label={'compute pred probs'}
              as={isTraining ? FaSpinner : AiFillPlayCircle}
              animation={isTraining ? spinAnimation : null}
              // variant={'unstyled'}
              _hover={{ cursor: 'pointer' }}
              onClick={() => {
                if (!isTraining) {
                  setIsTraining(true)
                  // yield to re-render before doing compute-bound work,
                  // otherwise the spinner won't display
                  setTimeout(async () => {
                    await populatePredProbs()
                    setIsTraining(false)
                  }, 0)
                }
              }}
            />
          </Flex>
        </Tooltip>
        <Text fontSize={'md'}>Train the model in your browser!</Text>
      </HStack>

      <PredProbsTable
        data={data ? Object.values(data) : []}
        classes={classes}
        setActiveImageId={setActiveImageId}
      />
    </VStack>
  )
}

const propsAreEqual = (prevProps: PredProbsProps, nextProps: PredProbsProps) => {
  const prevData = prevProps.data
  if (!prevData) {
    return false
  }
  const nextData = nextProps.data
  return Object.entries(nextData).every((entry) => {
    const id = entry[0]
    const datapoint = entry[1]
    return datapoint.probabilities === prevData[id].probabilities
  })
}

export default React.memo(PredProbs, propsAreEqual)
