import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {DAppProvider} from '@usedapp/core'
import {TransactionProvider} from '../context/TransactionContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DAppProvider config={{}}>
        <TransactionProvider>
          <Component {...pageProps} />
        </TransactionProvider>
      </DAppProvider>
    </ChakraProvider>
  )
}

export default MyApp
