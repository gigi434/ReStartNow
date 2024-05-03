import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  notificationReducer,
  informationFilterReducer,
  regionReducer,
  subsidySearchReducer,
} from '@/src/slice'

const rootReducer = combineReducers({
  notifications: notificationReducer,
  informationFilter: informationFilterReducer,
  region: regionReducer,
  subsidySearch: subsidySearchReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
