import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import * as React from 'react'

export function Hero() {
  const theme = useTheme()
  return (
    <section>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <Stack spacing={1} alignItems="center" py={theme.spacing(8)}>
          {/* 見出し */}
          <Typography variant="h3">失業保険だけじゃない！</Typography>
          {/* 副見出し */}
          <Typography variant="h4">
            退職した人がもらえる助成金が一問一答で分かるサイト
          </Typography>
        </Stack>
        {/* CTA */}
        <Button href="/questionAndAnswer" variant="contained">
          <Typography
            variant="body1"
            mx={theme.spacing(2)}
            my={theme.spacing(1)}
          >
            診断する
          </Typography>
        </Button>
        {/* 下矢印 */}
        <Box pt={theme.spacing(5)}>
          <DoubleArrowIcon sx={{ rotate: '90deg', fontSize: '40px' }} />
        </Box>
      </Stack>
    </section>
  )
}
