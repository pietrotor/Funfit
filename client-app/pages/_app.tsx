import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import Providers from '@/components/redux/providers'
export default function App ({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Providers>
      <Component {...pageProps} />
      </Providers>
    </NextUIProvider>
  )
}
