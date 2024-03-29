import React from 'react'
import { Step } from 'react-joyride'
import { ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react'

export const tourSteps: Step[] = [
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'left'}>
        {/*<Heading size={'xs'}>Welcome to Cleanlab Vizzy!</Heading>*/}
        <Text>
          Welcome to <strong>Cleanlab Vizzy</strong> &mdash; an interactive visualization of the
          Cleanlab algorithm.
        </Text>
        <Text>
          This is an <strong>in-depth tutorial</strong> that explains how the Cleanlab algorithm
          automatically identifies and corrects label errors in datasets. You can{' '}
          <strong>skip</strong> this at any time.
        </Text>
      </VStack>
    ),
    placement: 'center',
    target: 'body',
    disableBeacon: true,
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>
          This is a dataset with <strong>300</strong> images.
        </Text>
        <Text>
          It contains 3 classes: <strong>cats</strong>, <strong>dogs</strong>, and{' '}
          <strong>bears</strong>. There are 97 images of each class.
        </Text>
        <Text>
          It also contains 9 <strong>out-of-distribution</strong> images that do not belong to any
          of the 3 classes.
        </Text>
        <Text>
          Each image has been given a label. Most of these are correct, but a small number are
          wrong.
        </Text>
        <Text>
          <strong>Add more label errors</strong> to see if the Cleanlab algorithm is able to catch
          it!
        </Text>
      </VStack>
    ),
    target: '.tour-dataset-interface',
    title: 'Dataset',
    placement: 'right',
    disableBeacon: true,
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>
          We train a simple <strong>image classifier</strong> on the dataset to generate
          out-of-sample predicted probabilities.
        </Text>
        <Text>
          Cleanlab does not rely on a classifier's predictions being perfect. Rather, the predicted
          probabilities are indicative of the relative confidence a model has in the correctness of
          a label, especially when compared to other images in that class. Cleanlab uses this to
          identify label errors.
        </Text>
      </VStack>
    ),
    target: '.tour-pred-probs',
    title: 'Predicted probabilities',
    placement: 'right',
    disableBeacon: true,
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>
          Click the <strong>Play</strong> button to train the image classifier in your browser.
        </Text>
        <Text>
          This trains the classifier and generates a probability distribution over the 3 classes,
          corresponding to the model's confidence that the image is a cat, dog, or bear.
        </Text>
      </VStack>
    ),
    target: '.tour-play-button',
    title: 'Train the model',
    placement: 'right',
    disableBeacon: true,
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>
          Cleanlab computes <strong>percentile-based thresholds</strong> for each label class based
          on the predicted probabilities.
        </Text>
        <Text>
          Intuitively, these thresholds can be used to distinguish which datapoints are more or less
          likely to have a given label:
        </Text>
        <UnorderedList pl={4}>
          <ListItem>
            For example, datapoints with class probabilities exceeding a{' '}
            <em>high class percentile threshold</em> are more likely to belong to that class.
          </ListItem>
          <ListItem>
            Conversely, datapoints with class probabilities below a{' '}
            <em>low class percentile threshold</em> are unlikely to belong to that class.
          </ListItem>
        </UnorderedList>
        <Text>
          Based on this, Cleanlab computes <strong>suggested labels</strong> for images it is
          confident about.
        </Text>
        <Text>
          We can then categorize these images based on its given label and suggested label to
          construct a matrix that we call the <strong>confident joint</strong>.
        </Text>
      </VStack>
    ),
    target: '.tour-confident-joint',
    title: 'Confident Joint',
    placement: 'left',
    disableBeacon: true,
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>
          Images with given labels that do not match Cleanlab's suggested label are considered{' '}
          <strong>label issues</strong>.
        </Text>
        <Text>
          Images with probabilities that fall below the out-of-distribution thresholds for all
          classes are deemed to be <strong>out-of-distribution</strong>.
        </Text>
      </VStack>
    ),
    target: '.tour-results',
    title: 'Results',
    placement: 'left',
    disableBeacon: true,
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>
          You can also <strong>drag the sliders</strong> to change the percentile thresholds used by
          Cleanlab to determine the suggested label of an image, or whether it is
          out-of-distribution.
        </Text>
        <Text>
          <strong>Hover over any image</strong> and the ranges below show how the image's predicted
          probabilities compare against these threshold values.
        </Text>
      </VStack>
    ),
    target: '.tour-explainer',
    title: 'Thresholds',
    placement: 'top',
    disableBeacon: true,
  },
  {
    content: (
      <VStack align={'flex-start'} width={'100%'} spacing={'1rem'} textAlign={'justify'}>
        <Text>You can open this tutorial again by clicking this button.</Text>
      </VStack>
    ),
    target: '.tour-learn-button',
    title: 'Learn',
    placement: 'bottom',
    disableBeacon: true,
  },
]
