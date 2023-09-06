import React from 'react'
import {
  Header,
  Footer,
  SubsidySearchForm,
  CustomTable,
} from '@/src/components'
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { ClientSideSubsidy } from '@/src/types'

type SubsidySearchProps = {
  subsidies: ClientSideSubsidy[]
}

export function SubsidySearch({ subsidies }: SubsidySearchProps) {
  const theme = useTheme()
  return (
    <Stack>
      <Header />
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
              {/* 助成金検索フォーム */}
              <SubsidySearchForm subsidies={subsidies} />
            </Box>
          </Grid>
          <Grid item xs={12} md={9} flexGrow={1}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {/* 見出し */}
              <Typography variant="h6">助成金一覧</Typography>
              {/* 助成金一覧 */}
              <CustomTable subsidies={subsidies} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Stack>
  )
}
