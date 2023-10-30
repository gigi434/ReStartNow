import React from 'react'
import { Stack, Typography, Grid, Box, List, ListItem } from '@mui/material'
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
              <Typography variant="h6" gutterBottom>
                一問一答の特徴:
              </Typography>
              <List>
                <ListItem>
                  1. 受け取れそうな助成金・給付金サービスが瞬時に知れる。
                </ListItem>
                <ListItem>
                  2.
                  一問一答方式で、おおよその受給資格及び受給金額を直感的に確認可能。
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  )
}
