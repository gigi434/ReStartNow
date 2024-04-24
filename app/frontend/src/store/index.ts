import { configureStore } from '@reduxjs/toolkit'
import {
  notificationReducer,
  informationFilterReducer,
  regionReducer,
} from '@/src/slice'

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    informationFilter: informationFilterReducer,
    region: regionReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
