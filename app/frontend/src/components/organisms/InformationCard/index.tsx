import { Grid, Stack, Typography, Link } from '@mui/material'
import * as React from 'react'
import type { ClientSideInformation } from '@/src/types'
import { format, parseISO } from 'date-fns'

type InformationCardProps = {
  information: ClientSideInformation
}

export function InformationCard({ information }: InformationCardProps) {
  return (
    <Stack key={information.id} spacing={2}>
      <Typography variant="h6">{information.title}</Typography>
      <Grid container justifyContent="space-between">
        <Typography variant="caption">
          {information?.createdAt
            ? `公開日：${format(
                parseISO(information.createdAt),
                'yyyy-MM-dd HH:mm:ss'
              )}`
            : undefined}
        </Typography>
        <Link
          href={`/informations/${information.id}`}
          underline="none"
          color="primary"
        >
          READ MORE
        </Link>
      </Grid>
    </Stack>
  )
}
