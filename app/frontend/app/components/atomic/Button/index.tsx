import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

export default function Button({
  color = 'primary',
  children,
  size = 'medium',
  disabled = false,
  variant = 'contained',
}: MuiButtonProps) {
  return (
    <MuiButton color={color} variant={variant} size={size} disabled={disabled}>
      {children}
    </MuiButton>
  )
}
