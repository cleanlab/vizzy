import React, { useEffect } from 'react'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'
import { tourSteps } from './TourSteps'
import { useColorModeValue } from '@chakra-ui/react'
import { miniTourSteps } from './MiniTourSteps'

interface TourWrapperProps {
  miniTourEnabled: boolean
  setMiniTourEnabled: (enabled: boolean) => void
  tourEnabled: boolean
  setTourEnabled: (enabled: boolean) => void
  children: any
}

const TourWrapper = (props: TourWrapperProps) => {
  const { miniTourEnabled, setMiniTourEnabled, tourEnabled, setTourEnabled, children } = props
  const bgColor = useColorModeValue('#FFFFFF', '#4A5568')
  const textColor = useColorModeValue('#000000', '#FFFFFF')

  useEffect(() => {
    if (window.localStorage.getItem('vizzyTourTaken') !== 'true') {
      setMiniTourEnabled(true)
    }
  }, [setMiniTourEnabled])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setTourEnabled(false)
    }
  }

  const handleJoyrideMiniCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      window.localStorage.setItem('vizzyTourTaken', 'true')
      setMiniTourEnabled(false)
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
      <Joyride
        callback={handleJoyrideMiniCallback}
        continuous
        hideBackButton
        hideCloseButton
        run={miniTourEnabled}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={miniTourSteps}
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
