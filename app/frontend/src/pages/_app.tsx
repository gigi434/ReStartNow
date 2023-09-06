import type { AppProps } from 'next/app'
import React from 'react'
import { store } from '@/src/store'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { initMocks } from '@/mocks'
import { AxiosErrorHandleProvider } from '@/src/utils'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

if (process.env.NODE_ENV === 'development') {
  await initMocks()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AxiosErrorHandleProvider>
          <Component {...pageProps} />
        </AxiosErrorHandleProvider>
      </QueryClientProvider>
    </Provider>
  )
}
