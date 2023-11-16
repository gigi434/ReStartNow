import { Container, Stack, Box, Button } from '@mui/material'
import React from 'react'
import { Header, Footer, InformationList } from '@/src/components'
import { useTheme } from '@mui/system'
import type { Information } from '@prisma/client'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useRouter } from 'next/router'

type InformationListArticleListProps = {
  informations: Information[]
}

export function InformationListArticleList({
  informations,
}: InformationListArticleListProps) {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Stack>
      {/* ヘッダー */}
      <Header />
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
        {/* コンテンツ */}
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
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              onClick={() => router.back()}
            >
              Back
            </Button>
          </Box>
          <Stack
            spacing={{ xs: 2, md: 4 }}
            justifyContent="flex-start"
            alignItems="stretch"
          >
            {/* お知らせ一覧 */}
            <InformationList informations={informations} />
          </Stack>
        </Stack>
      </Container>
      {/* フッター */}
      <Footer />
    </Stack>
  )
}
