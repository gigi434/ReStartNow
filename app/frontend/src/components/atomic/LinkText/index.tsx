import React from 'react'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import Link from 'next/link'

interface LinkTextProps extends MuiLinkProps {
  href: string // これを追加してhrefを必須にします。
}

export function LinkText({
  color,
  href,
  variant = 'inherit',
  children,
  underline = 'always',
}: LinkTextProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <MuiLink
        color={color}
        variant={variant}
        underline={underline}
        target="_brank"
        rel="noopener"
      >
        {children}
      </MuiLink>
    </Link>
  )
}
