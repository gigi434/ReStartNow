import * as React from 'react'
import { Box, Link } from '@mui/material'

interface NavigationMenuProps {
  href: string
  content: string
}

const NavigationItem: NavigationMenuProps[] = [
  { href: '/results', content: '結果閲覧' },
  { href: '/information', content: 'お知らせ' },
  { href: '/profile', content: 'プロフィール' },
]

const clickHandle = (event: React.SyntheticEvent) => event.preventDefault()

export default function NavigationMenu() {
  return (
    <Box
      sx={{
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 3,
        },
      }}
      onClick={clickHandle}
    >
      {NavigationItem.map((item, idx) => {
        return (
          <Link key={idx} href={item.href} color="inherit" underline="none">
            {item.content}
          </Link>
        )
      })}
    </Box>
  )
}
