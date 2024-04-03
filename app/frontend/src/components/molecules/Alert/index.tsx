import React from 'react'
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert'

export function Alert({
  onClose,
  severity = 'info',
  variant = 'standard',
  children,
}: MuiAlertProps) {
  return (
    <MuiAlert variant={variant} onClose={onClose} severity={severity}>
      {children}
    </MuiAlert>
  )
}
