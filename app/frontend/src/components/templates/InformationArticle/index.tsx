import { Stack, Button, Typography, Container, Box } from '@mui/material'
import React from 'react'
import { Divider, Header, Footer } from '@/src/components'
import { format, parseISO } from 'date-fns'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useTheme } from '@mui/system'
import { ClientSideInformation } from '@/src/types'
import Link from 'next/link'

type InformationArticleProps = {
  information: ClientSideInformation
}

export function InformationArticle({ information }: InformationArticleProps) {
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
            <Link href={`/informations`} passHref legacyBehavior>
              <Button startIcon={<ArrowBackIosNewOutlinedIcon />}>Back</Button>
            </Link>
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

            <Stack alignItems={'flex-end'} spacing={1}>
              {/* 公開日 */}
              <Typography variant="caption">
                {`公開日：${format(
                  parseISO(information.createdAt),
                  'yyyy-MM-dd HH:mm:ss'
                )}`}
              </Typography>
              {/* 更新日 */}
              <Typography variant="caption">
                {`更新日：${format(
                  parseISO(information.updatedAt),
                  'yyyy-MM-dd HH:mm:ss'
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
