import React from 'react'
import { Stack, Container } from '@mui/material'
import {
  Header,
  Footer,
  Hero,
  FAQ,
  HowToUse,
  IntroduceFeatures,
} from '@/src/components'
import { useTheme } from '@mui/system'

export function LandingPage() {
  const theme = useTheme()
  return (
    <Stack>
      {/* ヘッダー */}
      <Header />
      {/* コンテンツ */}
      <Container
        maxWidth="lg"
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
        <Stack justifyContent="flex-start" alignItems="stretch" gap={7}>
          {/* ヒーロー */}
          <Hero />
          {/* 利用の流れ */}
          <HowToUse />
          {/* 機能紹介 */}
          <IntroduceFeatures />
          {/* よくある質問 */}
          <FAQ />
        </Stack>
      </Container>
      {/* フッター */}
      <Footer />
    </Stack>
  )
}
