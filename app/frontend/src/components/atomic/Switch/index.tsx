import * as React from 'react'
import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from '@mui/material'

export function Switch({
  defaultChecked = false,
  required = false,
  disabled = false,
  size = 'medium',
  color = 'primary',
}: MuiSwitchProps) {
  return (
    <MuiSwitch
      required={required}
      defaultChecked={defaultChecked}
      disabled={disabled}
      size={size}
      color={color}
    />
  )
}
