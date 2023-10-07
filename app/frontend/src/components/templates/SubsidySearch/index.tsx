import React from 'react'
import {
  Header,
  Footer,
  SubsidySearchForm,
  CustomTable,
} from '@/src/components'
import { Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import { ErrorBoundaryClass } from '@/src/utils/error'
import { Subsidy } from '@prisma/client'

type SubsidySearchProps = {
  subsidies: Subsidy[]
}

export function SubsidySearch({ subsidies }: SubsidySearchProps) {
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
            {/* 助成金検索フォーム */}
            <SubsidySearchForm subsidies={subsidies} />
          </Grid>
          <Grid item xs={12} md={10} flexGrow={1}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {/* 見出し */}
              <Typography variant="h6">助成金一覧</Typography>
              {/* 助成金一覧 */}
              <ErrorBoundaryClass>
                <CustomTable subsidies={subsidies} />
              </ErrorBoundaryClass>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Stack>
  )
}
