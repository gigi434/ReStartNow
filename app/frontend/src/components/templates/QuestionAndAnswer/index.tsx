import { Container, useTheme, Button, Box, Stack } from '@mui/material'
import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import { Header, Footer, HorizontalLinearStepper } from '@/src/components'
import * as React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ClientSideQuestion } from '@/src/types'

type QuestionAndAnswerProps = {
  questions: ClientSideQuestion[]
}

export function QuestionAndAnswer({ questions }: QuestionAndAnswerProps) {
  const params = useParams()
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
            <Link
              href={`/subsidies/${params?.subsidyId}`}
              passHref
              legacyBehavior
            >
              <Button startIcon={<ArrowBackIosNewOutlined />}>Back</Button>
            </Link>
          </Box>

          {/* ステッパー */}
          <HorizontalLinearStepper questions={questions} />
        </Stack>
      </Container>
      {/* フッター */}
      <Footer />
    </Stack>
  )
}
