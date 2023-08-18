import { Grid, Stack, Typography, Link as MuiLink } from '@mui/material'
import * as React from 'react'
import type { ClientSideInformation } from '@/src/types'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

type InformationCardProps = {
  information: ClientSideInformation
}

export function InformationCard({ information }: InformationCardProps) {
  return (
    <Stack key={information.id} spacing={2} width={'100%'}>
      {/* 見出し */}
      <Typography variant="h6">{information.title}</Typography>
      <Grid container justifyContent="space-between">
        {/* 公開日 */}
        <Typography variant="caption">
          {information?.createdAt
            ? `公開日：${format(
                parseISO(information.createdAt),
                'yyyy-MM-dd HH:mm:ss'
              )}`
            : undefined}
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
