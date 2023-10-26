import React from 'react'
import {
  Header,
  Footer,
  RegionSearchForm,
  RegionCardList,
  Copyright,
  LinkText,
} from '@/src/components'
import { Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import { Municipality, Prefecture } from '@prisma/client'

type RegionSearchProps = {
  prefectures: Prefecture[]
  municipalities: Municipality[]
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
        maxWidth="xl"
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
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          minHeight={`calc(100vh - ${theme.spacing(8)})`}
          spacing={5}
        >
          <Grid item xs={12} md={2}>
            {/* 地域検索フォーム */}
            <RegionSearchForm
              prefectures={prefectures}
              municipalities={municipalities}
            />
          </Grid>
          <Grid item xs={12} md={10} flexGrow={1}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack
                alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
                spacing={1}
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent={'space-between'}
              >
                {/* 見出し */}
                <Typography variant="h6">地域一覧</Typography>
                {/* カード画像のクレジット表記 */}
                <Copyright prefix="画像提供: ">
                  <LinkText href="https://map-it.azurewebsites.net/">
                    Map-It マップイット | 地図素材サイト
                  </LinkText>
                </Copyright>
              </Stack>
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
