import { Stack, Button, Typography, Container, Box } from '@mui/material'
import React from 'react'
import { Divider, Header, Footer } from '@/src/components'
import { format, parseISO } from 'date-fns'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useTheme } from '@mui/system'
import type { Information } from '@prisma/client'
import { useRouter } from 'next/router'
import { formatDateWithTimeZone } from '@/src/utils'
type InformationArticleProps = {
  information: Information
}

export function InformationArticle({ information }: InformationArticleProps) {
  const theme = useTheme()
  const router = useRouter()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone // ブラウザのタイムゾーンを取得する

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
            {/* 見出し */}
            <Box>
              <Typography variant="h6">{information.title}</Typography>
            </Box>

            {/* 注意： クライアントとサーバー側でタイムスタンプの日時がずれるためエラーが発生する
            suppressHydrationWarningをtrueに設定することで対応する
            @see https://nextjs.org/docs/messages/react-hydration-error
            */}
            <Stack alignItems={'flex-end'} spacing={1}>
              {/* 公開日 */}
              <Typography variant="caption" suppressHydrationWarning={true}>
                {`公開日: ${formatDateWithTimeZone(
                  information.createdAt,
                  timeZone
                )}`}
              </Typography>
              {/* 更新日 */}
              <Typography variant="caption" suppressHydrationWarning={true}>
                {`更新日: ${formatDateWithTimeZone(
                  information.createdAt,
                  timeZone
                )}`}
              </Typography>
            </Stack>
            {/* 分割線 */}
            <Divider />
            {/* 本文 */}
            <Box>
              <Typography>{information.body}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </Stack>
  )
}
