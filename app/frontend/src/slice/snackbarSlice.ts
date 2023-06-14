// snackbarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SnackbarState {
  open: boolean
  message: string
}

const initialState: SnackbarState = {
  open: false,
  message: '',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<string>) => {
      state.open = true
      state.message = action.payload
    },
    hide: (state) => {
      state.open = false
    },
  },
})

export const { show, hide } = snackbarSlice.actions

export default snackbarSlice.reducer
