import React from 'react'
import { Typography } from '@mui/material'

type CopyrightProps = {
  prefix?: string
  displayYear?: boolean
  children: React.ReactNode
}
/**
 * 著作権を明記するためのコンポーネント
 */
export function Copyright({
  prefix = 'Copyright',
  displayYear = true,
  children,
}: CopyrightProps) {
  const year = new Date().getFullYear()
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {prefix} © {displayYear ? year : ''} {children}
    </Typography>
  )
}
