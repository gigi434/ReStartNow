import * as React from 'react'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'

export function LinkText({
  color,
  href,
  variant = 'inherit',
  children,
  underline = 'always',
}: MuiLinkProps) {
  return (
    <MuiLink href={href} color={color} variant={variant} underline={underline}>
      {children}
    </MuiLink>
  )
}
