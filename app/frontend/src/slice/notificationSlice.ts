import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material'

export type NotificationMessage = {
  id: number
  message: string
  severity: AlertColor
  open: boolean
}

export type addNotificationProps = Pick<
  NotificationMessage,
  'message' | 'severity'
>

const initialState: NotificationMessage[] = []

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<addNotificationProps>) => {
      const newNotification = {
        id: Date.now(),
        message: action.payload.message,
        severity: action.payload.severity,
        open: true,
      }
      state.push(newNotification)
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state = state.filter((notification) => notification.id !== action.payload)
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer
