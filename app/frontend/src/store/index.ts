import { configureStore } from '@reduxjs/toolkit'
import {
  notificationReducer,
  informationFilterReducer,
  regionReducer,
  subsidySearchReducer,
} from '@/src/slice'

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    informationFilter: informationFilterReducer,
    region: regionReducer,
    subsidySearch: subsidySearchReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
