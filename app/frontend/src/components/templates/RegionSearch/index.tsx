import React from 'react'
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
import { ClientSideMunicipality, ClientSidePrefecture } from '@/src/types'

type RegionSearchProps = {
  prefectures: ClientSidePrefecture[]
  municipalities: ClientSideMunicipality[]
}

export function RegionSearch({
  prefectures,
  municipalities,
}: RegionSearchProps) {
  const theme = useTheme()
  return (
    <Stack>
      <Header />
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          pt: {
            xs: theme.spacing(3),
            md: theme.spacing(5),
          },
          px: {
            xs: theme.spacing(2),
            md: theme.spacing(4),
          },
          pb: {
            xs: theme.spacing(5),
            md: theme.spacing(8),
          },
        }}
      >
        {/* コンテンツ */}
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          minHeight={`calc(100vh - ${theme.spacing(8)})`}
          spacing={5}
        >
          <Grid item xs={12} md={3}>
            <Box maxWidth={{ xs: '100%', md: 248 }}>
              {/* 地域検索フォーム */}
              <RegionSearchForm
                prefectures={prefectures}
                municipalities={municipalities}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9} flexGrow={1}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {/* 見出し */}
              <Typography variant="h6">地域一覧</Typography>
              {/* 地域一覧 */}
              <RegionCardList municipalities={municipalities} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Stack>
  )
}
