import { Stack, Typography, Link, Container } from '@mui/material'
import * as React from 'react'

export function ProfileSideBar() {
  return (
    <section>
      <Container>
        <Stack spacing={2} sx={{ m: 2, width: '320px' }}>
          <Typography variant="h6">プロフィール</Typography>

          <Link
            variant="subtitle2"
            href="/change-password"
            underline="none"
            color="inherit"
          >
            パスワードの変更
          </Link>

          <Link
            variant="subtitle2"
            href="/delete-account"
            underline="none"
            color="inherit"
          >
            アカウントの削除
          </Link>

          <Link
            variant="subtitle2"
            href="/logout"
            underline="none"
            color="inherit"
          >
            ログアウト
          </Link>
        </Stack>
      </Container>
    </section>
  )
}
