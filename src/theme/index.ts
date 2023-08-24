import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#28CD56',
      100: '#1A1B23',
      200: '#4A4A4A',
    },
  },
  config: {
    initialColorMode: 'dark',
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Poppins, sans-serif',
  },
});
