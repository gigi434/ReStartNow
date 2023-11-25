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
import useMediaQuery from '@mui/material/useMediaQuery';

export function Hero() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
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
            fontWeight={'bold'}
            sx={{
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '3rem',
              },
            }}
          >
            {`3ステップでわかる!`}
          </Typography>
          {/* 副見出し */}
          <Typography
            style={{ whiteSpace: 'pre-line', wordBreak: 'normal', overflowWrap: 'anywhere' }}
            variant="subtitle2"
            align='center'
            sx={{
              fontSize: {
                xs: '1rem',
                sm: '1.25rem',
                md: '1.5rem',
              },
            }}
          >
            {isSmallScreen ? `受給できそうな助成金・給付金が\n一問一答で分かるサイト` : `受給できそうな助成金・給付金が一問一答で分かるサイト`}
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
