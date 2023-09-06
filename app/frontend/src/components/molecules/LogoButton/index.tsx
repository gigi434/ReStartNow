import Link from 'next/link'
import { Link as MuiLink } from '@mui/material'
import React from 'react'
import { Logo } from '@/src/components'

export function LogoButton() {
  return (
    <Link href={'/'} passHref legacyBehavior>
      <MuiLink underline="none">
        <Logo />
      </MuiLink>
    </Link>
  )
}
