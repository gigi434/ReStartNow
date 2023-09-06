import type { Preview } from '@storybook/react'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/material-icons'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-styling'
import { lightTheme, darkTheme } from './themes'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { store } from '../src/store'
import { Provider } from 'react-redux'
import React from 'react'
import { handlers } from '../mocks/handlers'

initialize()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers,
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? darkTheme : lightTheme
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <Story />
            </QueryClientProvider>
          </Provider>
        </ThemeProvider>
      )
    },
  ],
}

export default preview

/**
 * Storybookのコンポーネントにグローバルにテーマを適用する配列オブジェクト
 * @see https://storybook.js.org/recipes/styled-components
 */
export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
]

export const parameters = {
  nextjs: {
    appDirectory: true,
  },
}
