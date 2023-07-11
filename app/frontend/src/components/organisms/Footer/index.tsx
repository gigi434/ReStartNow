import * as React from 'react'
import {
  NavigationMenu,
  Copyright,
  Logo,
  Divider,
  LinkText,
} from '@/src/components'
import { Box, Container, Button } from '@mui/material'

/**
 * フッター
 */
export function Footer() {
  return (
    <section>
      {/* 分割線 */}
      <Divider />
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        {/* ロゴ */}
        <Button sx={{ textAlign: 'center', mb: 2 }}>
          <Logo />
        </Button>
        {/* ナビゲーション */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <NavigationMenu
            navItems={[
              { href: '/privacy', content: 'プライバシーポリシー' },
              { href: '/sitemap', content: 'サイトマップ' },
            ]}
          />
        </Box>
        {/* コピーライト */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Copyright />
        </Box>
      </Box>
    </section>
  )
}
