import React from 'react'
import {
  Header,
  Footer,
  SubsidySearchForm,
  CustomTable,
} from '@/src/components'
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { ErrorBoundaryClass } from '@/src/utils/error'
import { Subsidy } from '@prisma/client'
import { CustomSubsidy } from '@/src/utils'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'

type SubsidySearchProps = {
  subsidies: CustomSubsidy[]
}

export function SubsidySearch({ subsidies }: SubsidySearchProps) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const router = useRouter()

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
        {/* 戻るボタン */}
        <Box>
          <Button
            startIcon={<ArrowBackIosNewOutlined />}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Box>
        {/* この画面で何をするのかを示す文章 */}
        <Stack
          alignItems={isSmallScreen ? 'center' : 'baseline'}
          direction={isSmallScreen ? 'column' : 'row'}
          justifyContent={'center'}
          sx={{
            fontSize: {
              xs: '1.125rem',
              sm: '1.25rem',
            },
            paddingBottom: {
              xs: theme.spacing(3),
              sm: theme.spacing(5),
            },
          }}
        >
          {/* この画面で何をするのかを示す文章 */}
          <Typography
            component={'div'}
            fontWeight={'bold'}
            fontSize={{ xs: '1.5rem', sm: '1.75rem' }}
            sx={{ color: theme.palette.primary.main }}
          >
            {`助成金・給付金`}
          </Typography>
          <Typography component={'div'} fontSize={'inherit'}>
            {`を選択してください`}
          </Typography>
        </Stack>
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
