import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import store from '../store'
import client from '@/graphql/apollo-client'
import ToastComponent from '@/components/atoms/Toast/toasts'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ToastComponent />
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </ApolloProvider>
    </Provider>
  )
}
