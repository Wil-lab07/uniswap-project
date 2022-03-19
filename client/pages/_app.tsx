import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { Provider, chain} from 'wagmi'
import { TransactionProvider } from '../context/TransactionContext'

const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC, chain.ropsten.id)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider autoConnect provider={provider}>
        <TransactionProvider>
          <Component {...pageProps} />
        </TransactionProvider>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
