import { configureStore } from '@reduxjs/toolkit'
import {
  snackbarReducer,
  informationFilterReducer,
  regionReducer,
  subsidySearchReducer,
} from '@/src/slice'

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    informationFilter: informationFilterReducer,
    region: regionReducer,
    subsidySearch: subsidySearchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
