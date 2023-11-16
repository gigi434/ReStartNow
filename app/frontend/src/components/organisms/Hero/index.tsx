import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  Link as MuiLink,
} from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import React from 'react'
import Link from 'next/link'

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
        <Stack spacing={2} alignItems="center" py={theme.spacing(8)}>
          {/* 見出し */}
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              fontSize: {
                xs: '1.25rem',
                sm: '1.5rem',
                md: '2rem',
              },
            }}
          >
            失業保険だけじゃない！
          </Typography>
          {/* 副見出し */}
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: '1.125rem',
                sm: '1.25rem',
                md: '1.5rem',
              },
            }}
          >
            受給できそうな助成金・給付金が一問一答で分かるサイト
          </Typography>
        </Stack>
        {/* CTA */}
        <Link href={'/municipalities'} passHref legacyBehavior>
          <MuiLink underline="none">
            <Button variant="contained">
              <Typography
                variant="body1"
                mx={theme.spacing(2)}
                my={theme.spacing(1)}
              >
                診断する
              </Typography>
            </Button>
          </MuiLink>
        </Link>
        {/* 下矢印 */}
        <Box pt={theme.spacing(5)}>
          <DoubleArrowIcon sx={{ rotate: '90deg', fontSize: '40px' }} />
        </Box>
      </Stack>
    </section>
  )
}
