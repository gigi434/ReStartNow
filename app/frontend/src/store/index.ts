import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { notificationReducer, informationFilterReducer } from '@/src/slice'

const rootReducer = combineReducers({
  notification: notificationReducer,
  informationFilter: informationFilterReducer,
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
