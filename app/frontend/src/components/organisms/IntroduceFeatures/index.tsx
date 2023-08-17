import React from 'react'
import { Stack, Typography, Grid, Box } from '@mui/material'
import Image from 'next/image'

export function IntroduceFeatures() {
  return (
    <Stack spacing={2}>
      <Typography
        variant="h5"
        fontWeight={'bold'}
        sx={{
          fontSize: {
            xs: '1.125rem',
            sm: '1.25rem',
            md: '1.5rem',
          },
        }}
      >
        機能紹介
      </Typography>
      <Stack direction={'row'} p={2}>
        <Grid container direction={'row'} justifyContent={'space-between'}>
          <Grid item sm={12} md={6}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image
                src={'/LP/Illustration - Scene Wireframe_512w.png'}
                alt="human"
                width={320}
                height={240}
              />
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box
              display="flex"
              flexDirection={'column'}
              justifyContent="flex-start"
            >
              <Typography>一問一答</Typography>
              <Typography>
                受給資格の確認機能シンプルな一問一答方式で、あなたが受け取れる助成金サービスを簡単に知ることができます。そのため、面倒な条件のチェック作業を短縮し、スムーズに助成金の受給資格を確認できます。
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  )
}
