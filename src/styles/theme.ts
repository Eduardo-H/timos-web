import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      '300': '#CCCCCC'
    },
    blue: {
      '800': '#292F3F',
      '700': '#373E4E',
      '100': '#4572E7'
    },
    yellow: {
      '100': '#DEBD48'
    },
    red: {
      '100': '#DE4848'
    },
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Raleway',
    body: 'Raleway'
  },
  styles: {
    global: {
      body: {
        bg: 'blue.800',
        color: 'white'
      }
    }
  }
});