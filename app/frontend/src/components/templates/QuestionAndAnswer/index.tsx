import {
  Container,
  useTheme,
  Button,
  Box,
  Stack,
  Typography,
} from '@mui/material'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import {
  Header,
  Footer,
  HorizontalLinearStepper,
  Skeleton,
} from '@/src/components'
import React, { Suspense } from 'react'
import { useRouter } from 'next/router'
import { ErrorBoundaryClass, QuestionsBySubsidyId } from '@/src/utils'
import useMediaQuery from '@mui/material/useMediaQuery'

type QuestionAndAnswerProps = {
  fetchedQuestions: QuestionsBySubsidyId
}

export function QuestionAndAnswer({
  fetchedQuestions,
}: QuestionAndAnswerProps) {
  const router = useRouter()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack>
      {/* ヘッダー */}
      <Header />
      {/* コンテンツ */}
      <Container
        maxWidth="sm"
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
          <Typography
            component={'div'}
            fontWeight={'bold'}
            fontSize={{ xs: '1.5rem', sm: '1.75rem' }}
            sx={{ color: theme.palette.primary.main }}
          >
            {`回答`}
          </Typography>
          <Typography component={'div'} fontSize={'inherit'}>
            {`してください`}
          </Typography>
        </Stack>
        <Stack
          direction={'column'}
          justifyContent="flex-start"
          alignItems="stretch"
          minHeight={`calc(100vh - ${theme.spacing(8)})`}
          spacing={{ xs: 4, md: 8 }}
        >
          {/* ステッパー */}
          <Suspense fallback={<Skeleton />}>
            <ErrorBoundaryClass>
              <HorizontalLinearStepper fetchedQuestions={fetchedQuestions} />
            </ErrorBoundaryClass>
          </Suspense>
        </Stack>
      </Container>
      {/* フッター */}
      <Footer />
    </Stack>
  )
}
