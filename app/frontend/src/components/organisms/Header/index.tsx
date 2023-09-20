import { LogoButton, NavigationMenu, Divider } from '@/src/components'
import { AppBar, Toolbar, Box, useTheme } from '@mui/material'

/**
 * ヘッダー
 */
export function Header() {
  const theme = useTheme()
  return (
    <section>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            px: {
              xs: theme.spacing(2),
            },
          }}
        >
          {/* ロゴ画像 */}
          <LogoButton />
          {/* ナビゲーション */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavigationMenu
              navItems={[
                // { href: '/results', content: '結果閲覧' },
                { href: '/informations', content: 'お知らせ' },
                // { href: '/profile', content: 'プロフィール' },
              ]}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {/* 分割線 */}
      <Divider />
    </section>
  )
}
