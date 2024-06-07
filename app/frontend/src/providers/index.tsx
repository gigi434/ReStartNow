import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { queryClient } from '@/src/lib/react-query'
import { ErrorBoundaryClass } from '@/src/utils'
import { setupStore } from '@/src/store'
import { AxiosErrorHandleProvider } from '@/src/utils'
import { Analytics } from '@vercel/analytics/react'
import { Snackbars } from '@/src/components'
type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Provider store={setupStore()}>
      <React.Suspense
        fallback={
          <div className="flex items-center justify-center w-screen h-screen">
            <CircularProgress size="xl" />
          </div>
        }
      >
        <ErrorBoundaryClass>
          <QueryClientProvider client={queryClient}>
            <AxiosErrorHandleProvider>
              {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
              {children}
              <Analytics />
              <Snackbars />
            </AxiosErrorHandleProvider>
          </QueryClientProvider>
        </ErrorBoundaryClass>
      </React.Suspense>
    </Provider>
  )
}
