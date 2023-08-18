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
        助成金受給に関する情報収集に時間をかけたくないあなたに
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
            助成金受給に関する情報収集は膨大な時間がかかり、手続きも複雑で面倒です。
          </FeatureBox>
        </Grid>
        <Grid item sm={12} md={4} p={2} gap={2}>
          <FeatureBox
            imageSrc="/LP/Illustration - pavan 1960_512w.png"
            altText="human"
            width={140}
            height={140}
          >
            私たちのサイトを利用することで、あなたは手軽かつ迅速に助成金サービスを知ることができます。
          </FeatureBox>
        </Grid>
        <Grid item sm={12} md={4} p={2} gap={2}>
          <FeatureBox
            width={140}
            height={140}
            imageSrc="/LP/Illustration - pavan 3544_512w.png"
            altText="human"
          >
            大切な時間を節約し、スムーズな受給手続きを行いましょう
          </FeatureBox>
        </Grid>
      </Grid>
    </Stack>
  )
}
