import React from 'react'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface CloseButtonProps {
  color?: 'default'
  disabled: boolean
  size: 'small' | 'medium' | 'large'
  onClick?: () => void
}

export function CloseButton({
  disabled = false,
  color = 'default',
  size = 'medium',
  ...props
}: CloseButtonProps) {
  return (
    <IconButton disabled={disabled} size={size} color={color}>
      <CloseIcon />
    </IconButton>
  )
}
