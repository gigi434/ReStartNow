/*
https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
テスト用に使用する再利用可能なredux-provider
*/

import { PropsWithChildren } from 'react'
import { render, renderHook } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import { setupStore } from '@/src/store'
import type { AppStore, RootState } from '@/src/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

function createWrapper(store: AppStore) {
  return function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  return {
    store,
    ...render(ui, { wrapper: createWrapper(store), ...renderOptions }),
  }
}

export function renderHookWithProviders<Result, Props>(
  render: (initialProps: Props) => Result,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  return {
    store,
    ...renderHook(render, { wrapper: createWrapper(store), ...renderOptions }),
  }
}
