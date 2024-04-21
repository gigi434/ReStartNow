import React from 'react'
import MuiSnackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { NotificationMessage } from '@/src/slice'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

type SnackbarProps = {
  notification: NotificationMessage
  onClose: (id: number) => void
}

export function Snackbar({ notification, onClose }: SnackbarProps) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      // コンポーネントの外をクリックした場合はスナックバーを閉じない
      return
    }
    onClose(notification.id)
  }

  return (
    <MuiSnackbar
      key={notification.id}
      open={notification.open}
      onClose={handleClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <MuiAlert
        severity={notification.severity}
        sx={{ width: '100%' }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {notification.message}
      </MuiAlert>
    </MuiSnackbar>
  )
}
