import React from 'react'
import {
  Divider as MuiDivider,
  DividerProps as MuiDividerProps,
} from '@mui/material'

export function Divider({
  textAlign,
  children,
  orientation = 'horizontal',
  variant,
}: MuiDividerProps) {
  return (
    <MuiDivider
      textAlign={textAlign}
      orientation={orientation}
      variant={variant}
    >
      {children}
    </MuiDivider>
  )
}
