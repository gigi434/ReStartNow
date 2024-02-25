import type { AppProps } from 'next/app'
import React from 'react'
import { initMocks } from '@/mocks'
import { AppProvider } from '../providers'

if (process.env.NODE_ENV === 'development') {
  await initMocks()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
