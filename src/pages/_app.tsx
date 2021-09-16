import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from 'styles/theme';

import '../styles/global.scss';
import { AuthProvider } from 'hooks/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp;