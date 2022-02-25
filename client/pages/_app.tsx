import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {DAppProvider} from '@usedapp/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DAppProvider config={{}}>
        <Component {...pageProps} />
      </DAppProvider>
    </ChakraProvider>
  )
}

export default MyApp
