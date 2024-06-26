import React from 'react'
import { Grid, Container } from '@mui/material'
import { Header, Footer, SignupForm } from '@/src/components'
import { useTheme } from '@mui/system'

export function Signup() {
  const theme = useTheme()
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        {/* ヘッダー */}
        <Grid item sx={{ width: '100%' }}>
          <Header />
        </Grid>
        {/* コンテンツ */}
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          minHeight={`calc(100vh - ${theme.spacing(8)})`}
          p={theme.spacing(8)}
        >
          {/* ログインフォーム */}
          <Grid item spacing={2}>
            <SignupForm />
          </Grid>
        </Grid>
        {/* フッター */}
        <Grid item sx={{ width: '100%' }}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  )
}
