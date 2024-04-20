import React from 'react'
import MuiSnackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { NotificationMessage } from '@/src/slice'

type SnackbarProps = {
  notification: NotificationMessage
  onClose: (id: number) => void
}

export function Snackbar({ notification, onClose }: SnackbarProps) {
  return (
    <MuiSnackbar
      key={notification.id}
      open={notification.open}
      onClose={() => onClose(notification.id)}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <MuiAlert
        onClose={() => onClose(notification.id)}
        key={notification.id}
        variant="standard"
        severity={notification.severity}
        sx={{ width: '100%' }}
      >
        {notification.message}
      </MuiAlert>
    </MuiSnackbar>
  )
}
