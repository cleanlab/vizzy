import React from 'react'
import {
  Button,
  Flex,
  Heading,
  HStack,
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
  const spinAnimation = `${spin} infinite 1s linear`

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
            <Button
              as={isTraining ? FaSpinner : AiFillPlayCircle}
              animation={isTraining ? spinAnimation : null}
              variant={'unstyled'}
              // size={'60px'}
              isLoading={isTraining}
              className={'tour-play-button'}
              isDisabled={!labelsChanged}
              color={buttonColor}
              aria-label={'compute pred probs'}
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
