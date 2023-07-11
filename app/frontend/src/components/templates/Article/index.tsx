import { Stack, Grid, Button, Typography, Container } from '@mui/material'
import * as React from 'react'
import { useQuery } from 'react-query'
import { Divider, Header, Footer } from '@/src/components'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useTheme } from '@mui/system'
import { ClientSideInformation } from '@/src/types'

// Define the type for the component's props
type ArticleProps = {
  id: number
}

export function Article({ id }: ArticleProps) {
  const theme = useTheme()
  const {
    data: information,
    isLoading,
    isError,
  } = useQuery(['information', id], () => fetchInformation(id))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching information</div>
  }
  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        {/* ヘッダー */}
        <Grid item sx={{ width: '100%' }}>
          <Header />
        </Grid>
        {/* お知らせ内容 */}
        {/* 注意 Grid itemにjustifyContentを設定してもdisplay: blockであるため無効にななる。そのため、sx属性に設定する */}
        <Grid
          item
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            minHeight: `calc(100vh - ${theme.spacing(8)})`,
          }}
        >
          <Stack
            spacing={2}
            sx={{ maxWidth: '680px', width: '100%', my: 5, px: '1em' }}
          >
            {/* 戻るボタン */}
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Button startIcon={<ArrowBackIosNewOutlinedIcon />}>
                  Back
                </Button>
              </Grid>
            </Grid>
            {/* 見出し */}
            <Typography variant="h6">{information?.title}</Typography>
            <Stack>
              {/* 公開日 */}
              <Grid container justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <Typography variant="caption">
                    {information?.createdAt
                      ? `公開日：${format(
                          parseISO(information.createdAt),
                          'yyyy-MM-dd HH:mm:ss'
                        )}`
                      : undefined}
                  </Typography>
                </Grid>
              </Grid>
              {/* 更新日 */}
              <Grid container justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <Typography variant="caption">
                    {information?.updatedAt
                      ? `更新日：${format(
                          parseISO(information.updatedAt),
                          'yyyy-MM-dd HH:mm:ss'
                        )}`
                      : undefined}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
            {/* 分割線 */}
            <Divider />
            {/* 本文 */}
            <Typography>{information?.body}</Typography>
          </Stack>
        </Grid>
        {/* フッター */}
        <Grid item sx={{ width: '100%' }}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  )
}

async function fetchInformation(id: number): Promise<ClientSideInformation> {
  const { data } = await axios.get<ClientSideInformation>(
    process.env.NODE_ENV === 'development'
      ? `/informations/${id}`
      : `/api/informations/${id}`
  )

  return data
}
