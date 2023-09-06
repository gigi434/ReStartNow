import { Container, useTheme, Button, Box, Stack } from '@mui/material'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import {
  Header,
  Footer,
  HorizontalLinearStepper,
  Skeleton,
} from '@/src/components'
import React, { Suspense } from 'react'
import Link from 'next/link'
import { ClientSideQuestion } from '@/src/types'
import { useRouter } from 'next/router'

type QuestionAndAnswerProps = {
  questions: ClientSideQuestion[]
}

export function QuestionAndAnswer({ questions }: QuestionAndAnswerProps) {
  const router = useRouter()
  const theme = useTheme()

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
        <Stack
          direction={'column'}
          justifyContent="flex-start"
          alignItems="stretch"
          minHeight={`calc(100vh - ${theme.spacing(8)})`}
          spacing={{ xs: 4, md: 8 }}
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

          {/* ステッパー */}
          <Suspense fallback={<Skeleton />}>
            <HorizontalLinearStepper questions={questions} />
          </Suspense>
        </Stack>
      </Container>
      {/* フッター */}
      <Footer />
    </Stack>
  )
}
