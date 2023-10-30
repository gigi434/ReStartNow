import React from 'react'
import { Stack, Typography, Grid, Box } from '@mui/material'
import Image from 'next/image'

type FeatureBox = {
  imageSrc: string
  altText: string
  children: React.ReactNode
  width: number
  height: number
}

const FeatureBox = ({
  children,
  imageSrc,
  altText,
  width,
  height,
}: FeatureBox) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Image src={imageSrc} alt={altText} width={width} height={height} />
    <Typography variant="body1">{children}</Typography>
  </Box>
)

export function HowToUse() {
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
        助成金・給付金の条件に当てはまるか情報収集に時間をかけたくないあなたに
      </Typography>

      <Grid
        container
        direction={'row'}
        alignItems={'stretch'}
        justifyContent={'space-between'}
        p={2}
      >
        <Grid item sm={12} md={4} p={2} gap={2}>
          <FeatureBox
            imageSrc="/LP/Illustration - pavan 2950_512w.png"
            altText="human"
            width={45}
            height={140}
          >
            特に現在身体的・精神的に厳しい状況にある方々にとって、助成金・給付金の受給を得るための情報収集は調べるだけでも一苦労となります。
          </FeatureBox>
        </Grid>
        <Grid item sm={12} md={4} p={2} gap={2}>
          <FeatureBox
            imageSrc="/LP/Illustration - pavan 1960_512w.png"
            altText="human"
            width={140}
            height={140}
          >
            当サイトを利用することで、そのような煩雑な情報収集の手間を省き、すぐに受け取れそうな助成金・給付金サービスを知ることができます。
          </FeatureBox>
        </Grid>
        <Grid item sm={12} md={4} p={2} gap={2}>
          <FeatureBox
            width={140}
            height={140}
            imageSrc="/LP/Illustration - pavan 3544_512w.png"
            altText="human"
          >
            貴重な時間とエネルギーを無駄にせず、効率的に受給できそうな助成金・給付金を探しましょう。
          </FeatureBox>
        </Grid>
      </Grid>
    </Stack>
  )
}
