import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google'
import store from '../store'
import client from '@/graphql/apollo-client'
import ToastComponent from '@/components/atoms/Toast/toasts'
import NavigationProgress from '@/components/atoms/NavigationProgress'

const plusJakarta = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${plusJakarta.variable} font-body`}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ToastComponent />
          <NavigationProgress />
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </ApolloProvider>
      </Provider>
    </div>
  )
}
