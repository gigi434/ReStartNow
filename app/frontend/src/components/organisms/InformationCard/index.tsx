import { Grid, Stack, Typography, Link as MuiLink } from '@mui/material'
import React from 'react'
import type { Information } from '@prisma/client'
import Link from 'next/link'
import { formatDateWithTimeZone } from '@/src/utils'

type InformationCardProps = {
  information: Information
}

export function InformationCard({ information }: InformationCardProps) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone // ブラウザのタイムゾーンを取得する

  return (
    <Stack key={information.id} spacing={2} width={'100%'}>
      {/* 見出し */}
      <Typography variant="h6">{information.title}</Typography>
      <Grid container justifyContent="space-between">
        {/* 公開日 */}
        <Typography variant="caption" suppressHydrationWarning={true}>
          {`公開日：${formatDateWithTimeZone(information.createdAt, timeZone, {
            includeTime: true,
          })}`}
        </Typography>
        {/* ReadMore */}
        <Link legacyBehavior passHref href={`/informations/${information.id}`}>
          <MuiLink underline="none" color="primary">
            READ MORE
          </MuiLink>
        </Link>
      </Grid>
    </Stack>
  )
}
