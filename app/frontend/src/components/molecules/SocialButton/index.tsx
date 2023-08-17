import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import { IconButton, Link as MuiLink } from '@mui/material'
import Link from 'next/link'

export type SocialButtonProps = {
  socialApplicationName: string
  href: string
}

export function SocialButton({
  socialApplicationName,
  href,
}: SocialButtonProps) {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon />
      case 'twitter':
        return <TwitterIcon />
    }
  }
  return (
    <Link href={href} passHref legacyBehavior>
      <MuiLink underline="none">
        <IconButton aria-label={`${socialApplicationName}-link-button`}>
          {getIcon(socialApplicationName)}
        </IconButton>
      </MuiLink>
    </Link>
  )
}
