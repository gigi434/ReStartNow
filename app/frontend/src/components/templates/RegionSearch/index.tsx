import * as React from 'react'
import {
  Header,
  Footer,
  RegionSearchForm,
  RegionCardList,
} from '@/src/components'
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { Municipality } from '@prisma/client'

type RegionSearchProps = {
  Municipalities: {
    image: Municipality['municipalSymbolPath']
    title: Municipality['name']
  }[]
}

export function RegionSearch({ Municipalities }: RegionSearchProps) {
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
              {/* 地域検索フォーム */}
              <RegionSearchForm />
            </Box>
          </Grid>
          <Grid item xs={12} md={9} flexGrow={1}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {/* 見出し */}
              <Typography variant="h6">地域一覧</Typography>
              {/* 地域一覧 */}
              <RegionCardList cards={Municipalities} />
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
