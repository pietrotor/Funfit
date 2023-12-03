import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import Providers from '@/components/redux/providers'
import { ApolloProvider } from '@apollo/client'
import client from '@/graphql/apollo-client'
export default function App ({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <NextUIProvider>
        <Providers>
        <Component {...pageProps} />
        </Providers>
      </NextUIProvider>
    </ApolloProvider>
  )
}
