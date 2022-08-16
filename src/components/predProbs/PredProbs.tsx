import React from 'react'
import {
  Flex,
  Heading,
  HStack,
  IconButton,
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
  const {
    data,
    classes,
    setActiveImageId,
    populatePredProbs,
    labelsChanged,
    setLabelsChanged,
    dataset,
  } = props
  const [isTraining, setIsTraining] = React.useState(false)
  const buttonColor = useColorModeValue('teal.400', 'teal.200')

  const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg)
    }
  `

  const pulse = keyframes`
    0% {
      transform: scale(0.95);
    }

    60% {
      transform: scale(1.10);
    }

    100% {
      transform: scale(0.95);
    }`

  const spinAnimation = `${spin} infinite 1s linear`
  const pulseAnimation = `${pulse} infinite 1.5s`

  return (
    <VStack
      width={'100%'}
      height={'100%'}
      rounded={'md'}
      bgColor={useColorModeValue('blue.50', 'blue.900')}
      p={2}
      className={'tour-pred-probs'}
    >
      <HStack>
        <Text fontSize={'lg'}>2.</Text>
        <Heading size={'xs'} fontWeight={500}>
          PREDICTED PROBABILITIES
        </Heading>
      </HStack>
      <HStack w={'100%'} justify={'center'}>
        <Tooltip
          label={
            labelsChanged
              ? 'Train an image classifier on your constructed dataset!'
              : 'Change dataset labels before training again!'
          }
          hasArrow
        >
          <Flex>
            <IconButton
              className={'tour-play-button'}
              variant={'unstyled'}
              size={'lg'}
              transform={'scale(1)'}
              color={buttonColor}
              isDisabled={!labelsChanged}
              as={isTraining ? FaSpinner : AiFillPlayCircle}
              animation={isTraining ? spinAnimation : labelsChanged ? pulseAnimation : null}
              _hover={{ cursor: labelsChanged ? 'pointer' : 'auto' }}
              onClick={() => {
                if (labelsChanged && !isTraining) {
                  setIsTraining(true)
                  // yield to re-render before doing compute-bound work,
                  // otherwise the spinner won't display
                  setTimeout(async () => {
                    await populatePredProbs()
                    setIsTraining(false)
                    setLabelsChanged(false)
                  }, 0)
                }
              }}
              aria-label={'train model'}
            />
          </Flex>
        </Tooltip>
        <Text fontSize={'md'}>Train the model!</Text>
      </HStack>

      <PredProbsTable
        data={data ? Object.values(data) : []}
        dataset={dataset}
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
  if (prevProps.labelsChanged !== nextProps.labelsChanged) {
    return false
  }
  return Object.entries(nextData).every((entry) => {
    const id = entry[0]
    const datapoint = entry[1]
    return datapoint.probabilities === prevData[id].probabilities
  })
}

export default React.memo(PredProbs, propsAreEqual)
