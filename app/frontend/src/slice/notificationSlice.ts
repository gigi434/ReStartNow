import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material'

export interface NotificationMessage {
  id: number
  message: string
  severity: AlertColor
  open: boolean
}

export interface NotificationState {
  notifications: NotificationMessage[]
}

export type addNotificationProps = Pick<
  NotificationMessage,
  'message' | 'severity'
>

const initialState: NotificationState = {
  notifications: [],
}

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
      state.notifications.push(newNotification)
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      )
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer
