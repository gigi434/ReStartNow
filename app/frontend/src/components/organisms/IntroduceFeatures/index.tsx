import React from 'react'
import {
  Stack,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import Image from 'next/image'

export function IntroduceFeatures() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
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
      <Grid container direction={'row'} justifyContent={'space-between'}>
        <Grid item sm={12} md={6} width={'100%'}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src={'/LP/Illustration - Scene Wireframe_512w.png'}
              alt="human"
              width={isSmallScreen ? 160 : 320}
              height={isSmallScreen ? 120 : 240}
            />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          flexDirection={'column'}
          justifyContent="center"
        >
          <List>
            <ListItem>
              {
                '- 受給できそうな助成金・給付金サービスが瞬時に知ることができます。'
              }
            </ListItem>
            <ListItem>
              {
                '- 一問一答方式で、おおよその受給資格及び受給金額を直感的に確認可能です。'
              }
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Stack>
  )
}
