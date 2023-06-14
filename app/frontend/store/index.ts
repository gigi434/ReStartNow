// store.ts
import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from '../slice/snackbarSlice'

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
