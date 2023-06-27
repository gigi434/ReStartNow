import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from '@/src/slice/snackbarSlice'
import { informationFilterReducer } from '@/src/slice'

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    informationFilter: informationFilterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
