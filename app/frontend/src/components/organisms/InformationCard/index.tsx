import { Grid, Stack, Typography, Link } from '@mui/material'
import * as React from 'react'
import { Information } from '@prisma/client'

type InformationCardProps = {
  information: Information
}

export function InformationCard({ information }: InformationCardProps) {
  return (
    <Stack key={information.id} spacing={2}>
      <Typography variant="h6">{information.title}</Typography>
      <Grid container justifyContent="space-between">
        <Typography>{information.createdAt.toISOString()}</Typography>
        <Link
          href={`/information/${information.id}`}
          underline="none"
          color="primary"
        >
          READ MORE
        </Link>
      </Grid>
    </Stack>
  )
}
