import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme, HStack, Container,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import DatasetInterface from "./components/dataset/DatasetInterface";
import PredProbs from "./components/predProbs/PredProbs";
import ConfidentJointMatrix from "./components/confidentJoint/ConfidentJointMatrix";
import Results from "./components/results/Results";
import OutOfDistribution from "./components/ood/OutOfDistribution";
import SomeSlider from "./components/sliders/Slider";

export const App = () => {

  const getFilterFunc = (data, func) => {
    return data.filter(func)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end"/>
          <Container>
            <HStack>
              <VStack>
                <DatasetInterface />
                <SomeSlider />
              </VStack>
              <PredProbs />
              <VStack>
                <SomeSlider />
                <SomeSlider />
                <ConfidentJointMatrix />
                <OutOfDistribution />
              </VStack>
              <Results />
            </HStack>
          </Container>

        </Grid>
      </Box>
    </ChakraProvider>
  )
}
