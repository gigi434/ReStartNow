import * as React from 'react'
import {
  Header,
  Footer,
  ProfileSideBar,
  ProfileDetails,
} from '@/src/components'
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'

export function Profile() {
  const theme = useTheme()
  return (
    <Grid container direction="column">
      {/* ヘッダー */}
      <Grid item xs={12}>
        <Header />
      </Grid>
      {/* コンテンツ */}
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          pt: theme.spacing(5),
          px: theme.spacing(4),
          pb: theme.spacing(8),
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          minHeight={`calc(100vh - ${theme.spacing(8)})`}
          spacing={2}
        >
          <Grid item xs={12} md={3}>
            <Box maxWidth={{ xs: '100%', md: 248 }}>
              {/* プロフィールサイドバー */}
              <ProfileSideBar />
            </Box>
          </Grid>
          <Grid item xs={12} md={9} flexGrow={1}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {/* プロフィール詳細 */}
              <ProfileDetails />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      {/* フッター */}
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}
