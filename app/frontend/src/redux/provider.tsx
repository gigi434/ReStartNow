import { store } from '@/src/store'
import { Provider } from 'react-redux'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
