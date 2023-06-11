import { Stack, Typography, Link, Container, Grid, Button } from '@mui/material'
import { Divider } from '@/components'
import * as React from 'react'
import { useState } from 'react'

export function ProfileDetails() {
  const [email, setEmail] = useState('')
  return (
    <section>
      <Container>
        <Stack spacing={2} sx={{ m: 2, width: '632px' }}>
          <Typography variant="h5">プロフィール情報詳細</Typography>

          <Divider />

          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">アカウント情報</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                アカウント情報を変更
              </Button>
            </Grid>
          </Grid>

          {/* メールアドレス確認 */}
          <Typography variant="body1">メールアドレス</Typography>
          <Typography>{email}</Typography>

          {/* パスワード確認 */}
          <Typography variant="body1">パスワード</Typography>
          <Typography>{'*'.repeat(8)}</Typography>
        </Stack>
      </Container>
    </section>
  )
}
