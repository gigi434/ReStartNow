// store.ts
import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from '@/src/slice/snackbarSlice'

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
