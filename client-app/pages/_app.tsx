import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import Providers from '@/components/redux/providers'
import client from '@/graphql/apollo-client'
export default function App({ Component, pageProps }: AppProps) {
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
