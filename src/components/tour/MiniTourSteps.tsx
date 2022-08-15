import React from 'react'
import { Step } from 'react-joyride'
import { Text, VStack } from '@chakra-ui/react'

export const miniTourSteps: Step[] = [
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'left'}>
        <Text>
          This is an interactive visualization of the <strong>Cleanlab algorithm</strong> &mdash; a
          method for automatically identifying and correcting label errors in your datasets.
        </Text>
      </VStack>
    ),
    placement: 'center',
    title: 'Welcome to Cleanlab Vizzy!',
    target: 'body',
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>Click on the buttons to change an image's labels.</Text>
        <Text>
          <strong>Add label errors</strong> and see if the Cleanlab algorithm is able to catch it!
        </Text>
      </VStack>
    ),
    target: '.tour-label-selection',
    title: 'Change image labels',
    placement: 'top',
    disableScrollParentFix: true,
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>
          Click the <strong>Play</strong> button to train a simple image classifier on your dataset.
        </Text>
        <Text>Cleanlab uses the model outputs to identify label errors.</Text>
      </VStack>
    ),
    target: '.tour-play-button',
    title: 'Train the model',
    placement: 'right',
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>
          <strong>Mouse over any image</strong> to get an explanation of how it was categorized by
          Cleanlab.
        </Text>
        <Text>
          You can also <strong>drag the sliders</strong> to change the percentile thresholds used by
          Cleanlab to determine the suggested label of an image, or whether it is
          out-of-distribution.
        </Text>
      </VStack>
    ),
    target: '.tour-explainer',
    title: 'Explanation',
    placement: 'left',
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>You can open this quick guide again by clicking this button.</Text>
      </VStack>
    ),
    target: '.tour-guide-button',
    title: 'Guide',
    placement: 'bottom',
  },
]
