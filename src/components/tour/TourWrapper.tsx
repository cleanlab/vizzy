import React from 'react'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'
import { tourSteps } from './TourSteps'
import { useColorModeValue } from '@chakra-ui/react'

const TourWrapper = ({ tourEnabled, setTourEnabled, children }) => {
  const bgColor = useColorModeValue('#FFFFFF', '#4A5568')
  const textColor = useColorModeValue('#000000', '#FFFFFF')

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, step, index } = data
    console.log('index', index)
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setTourEnabled(false)
    }
  }

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideBackButton
        hideCloseButton
        run={tourEnabled}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={tourSteps}
        spotlightPadding={2}
        locale={{ last: 'Finish' }}
        styles={{
          options: {
            arrowColor: bgColor,
            backgroundColor: bgColor,
            primaryColor: '#319795',
            textColor: textColor,
            width: 500,
            zIndex: 1000,
          },
        }}
      />
      {children}
    </>
  )
}

export default TourWrapper
