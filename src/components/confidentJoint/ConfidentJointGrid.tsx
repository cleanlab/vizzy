import React from 'react'
import { Grid, GridItem, VStack, Tag, HStack } from '@chakra-ui/react'
import LabelIssueImage from '../results/LabelIssueImage'

const ConfidentJointGrid = (props) => {
  const { issues, setActiveImageId } = props

  // TODO: make conf joint image grid a new component when it renders real data
  const renderImageGrid = () => {
    return (
      <Grid templateColumns="repeat(5, 1fr)" gap={1} overflowY={'auto'}>
        {issues.slice(0, 19).map((datapoint) => (
          <GridItem key={datapoint.id}>
            <LabelIssueImage {...datapoint} id={datapoint.id} setActiveImageId={setActiveImageId} />
          </GridItem>
        ))}
      </Grid>
    )
  }

  return (
    <HStack width={'100%'} height={'100%'}>
      <Grid alignItems="center" height={'100%'}>
        <GridItem>
          <Tag colorScheme={'blue'} opacity={'80%'} size={'sm'}>
            given: cat
          </Tag>
        </GridItem>
        <GridItem>
          <Tag colorScheme={'blue'} opacity={'80%'} size={'sm'}>
            given: dog
          </Tag>
        </GridItem>
        <GridItem>
          <Tag colorScheme={'blue'} opacity={'80%'} size={'sm'}>
            given: mouse
          </Tag>
        </GridItem>
      </Grid>
      <VStack width={'100%'} height={'100%'}>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} h="5" width={'100%'} justifyItems="center">
          <GridItem>
            <Tag colorScheme={'yellow'} opacity={'80%'} size={'sm'}>
              suggested: cat
            </Tag>
          </GridItem>
          <GridItem>
            <Tag colorScheme={'yellow'} opacity={'80%'} size={'sm'}>
              suggested: dog
            </Tag>
          </GridItem>
          <GridItem>
            <Tag colorScheme={'yellow'} opacity={'80%'} size={'sm'}>
              suggested: mouse
            </Tag>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gap={0} width={'100%'} height={'100%'}>
          <Grid borderWidth="1px" borderColor="gray.600" justifyItems="center">
            <GridItem>{issues && renderImageGrid()}</GridItem>
          </Grid>
          <Grid borderWidth="1px">
            <GridItem>{issues && renderImageGrid()}</GridItem>
          </Grid>
          <Grid borderWidth="1px">
            <GridItem>{issues && renderImageGrid()}</GridItem>
          </Grid>
          <Grid borderWidth="1px">
            <GridItem>{issues && renderImageGrid()}</GridItem>
          </Grid>
          <Grid borderWidth="1px" borderColor="gray.600">
            <GridItem>{issues && renderImageGrid()}</GridItem>
          </Grid>
          <Grid borderWidth="1px">
            <GridItem>{issues && renderImageGrid()}</GridItem>
          </Grid>
          <Grid borderWidth="1px">
            <GridItem>{issues && renderImageGrid()}</GridItem>
          </Grid>
          <Grid borderWidth="1px">
            <GridItem>{issues && renderImageGrid()}</GridItem>
          </Grid>
          <Grid borderWidth="1px" borderColor="gray.600">
            <GridItem>{issues && renderImageGrid()}</GridItem>
          </Grid>
        </Grid>
      </VStack>
    </HStack>
  )
}

export default ConfidentJointGrid
