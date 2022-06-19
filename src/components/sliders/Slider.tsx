import React from 'react'
import {Slider, SliderFilledTrack, SliderThumb, SliderTrack} from "@chakra-ui/react";

const SomeSlider = (props) => {
  return (
    <Slider aria-label='slider-ex-1' defaultValue={30}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  )
}

export default SomeSlider
