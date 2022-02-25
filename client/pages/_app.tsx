import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {DAppProvider} from '@usedapp/core'
import { Provider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'
import { TransactionProvider } from '../context/TransactionContext'

const infuraId = 'f570c5eeec2248458df7957a0ffb3aa1'

const chains = defaultChains

const connectors = ({ chainId }: any) => {
  const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'My wagmi app',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DAppProvider config={{}}>
        <Provider autoConnect connectors={connectors}>
          <TransactionProvider>
            <Component {...pageProps} />
          </TransactionProvider>
        </Provider>
      </DAppProvider>
    </ChakraProvider>
  )
}

export default MyApp
