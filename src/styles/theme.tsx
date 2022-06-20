import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const pageWidth = 900
export const pageWidthLarge = 1100
export const CLBlueLight = 'rgba(200,230,255,0.85)'
export const CLBlue = '#0097a7'
export const CLBlueDark = '#09616b'
export const CLOrangeLight = '#fdd7b1'
export const CLOrange = '#ffab40'
export const CLOrangeDark = '#d28c2f'

export const theme = extendTheme({
  // fonts: {
  //   //"'Red Hat Display', sans-serif",
  //   // body: 'Roboto', //"'Red Hat Text', sans-serif",
  // },
  styles: {
    global: (props) => ({
      body: {
        color: mode('gray.700', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.900')(props),
        fontSize: '1.2em',
        '.deleted': {
          color: '#ff8383 !important',
          fontStyle: 'normal !important',
        },
        '.inserted': {
          color: '#b5f4a5 !important',
          fontStyle: 'normal !important',
        },
      },
      a: {
        color: mode('blue.500', 'blue.200')(props),
        transition: 'color 0.15s',
        transitionTimingFunction: 'ease-out',
        fontWeight: '500',
        outline: 'none',
        _hover: {
          color: mode('blue.600', 'blue.300')(props),
        },
      },
    }),
  },
  components: {
    FormLabel: {
      baseStyle: {
        fontWeight: '550',
      },
    },
    Popover: {
      parts: ['popper'],
      baseStyle: (props) => ({
        popper: {
          zIndex: 10,
          maxW: 'xs',
          // maxW: props.width ? props.width : 'xs',
          w: props.width,
        },
      }),
    },
    Button: {
      baseStyle: {
        fontWeight: '500',
        rounded: 'xl',
        _focus: { boxShadow: 'none' },
      },
    },
    Tab: {
      baseStyle: {
        _focus: { boxShadow: 'none' },
      },
    },
    Tag: {
      baseStyle: {
        rounded: 'lg',
      },
    },
    textarea: {
      baseStyle: {
        background: 'green.300',
      },
    },
    // UnorderedList: {
    //   baseStyle: {
    //
    //     align: "left",
    //     pl: "30px"
    //   }
    // },
    Link: {
      baseStyle: {
        fontWeight: 'inherit',
        outline: 'none',
        _hover: {
          textDecoration: 'none',
        },
      },
      variants: {
        text: {
          color: 'blue.400',
          transition: 'color 0.15s',
          transitionTimingFunction: 'ease-out',
          fontWeight: '500',
          outline: 'none',
          _hover: {
            color: 'blue.300',
          },
        },
        gradient: {
          bgGradient: 'linear(to-br, blue.400,blue.300)',
          bgClip: 'text',
          fontWeight: '500',
          outline: 'none',
          _hover: {
            bgGradient: 'linear(to-br, blue.500,blue.300)',
            bgClip: 'text',
          },
        },
      },
    },
  },
  mdx: {
    h1: {
      mt: '2rem',
      mb: '.25rem',
      lineHeight: 1.2,
      fontWeight: 'bold',
      fontSize: '1.875rem',
      letterSpacing: '-.025em',
    },
    h2: {
      mt: '4rem',
      mb: '0.5rem',
      lineHeight: 1.3,
      fontWeight: 'semibold',
      fontSize: '1.5rem',
      '& + h3': {
        mt: '1.5rem',
      },
    },
    h3: {
      mt: '3rem',
      // mb: "0.5rem",
      lineHeight: 1.25,
      fontWeight: 'semibold',
      fontSize: '1.25rem',
    },
    h4: {
      mt: '3rem',
      lineHeight: 1.375,
      fontWeight: 'semibold',
      fontSize: '1.125rem',
    },
    p: {
      mt: '1.25rem',
      lineHeight: 1.7,
      'blockquote &': {
        mt: 0,
      },
    },
    hr: {
      my: '4rem',
    },
    blockquote: {
      bg: 'orange.100',
      borderWidth: '1px',
      borderColor: 'orange.200',
      rounded: 'lg',
      px: '1.25rem',
      py: '1rem',
      my: '1.5rem',
    },
    ul: {
      mt: '1.5rem',
      ml: '1.25rem',
      'blockquote &': { mt: 0 },
      '& > * + *': {
        mt: '0.25rem',
      },
    },
    code: {
      rounded: 'sm',
      px: '1',
      fontSize: '0.875em',
      py: '2px',
      whiteSpace: 'nowrap',
      lineHeight: 'normal',
    },
  },
})
