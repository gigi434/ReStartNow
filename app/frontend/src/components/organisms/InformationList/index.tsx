import { Stack } from '@mui/material'
import { InformationCard } from '@/src/components'
import * as React from 'react'
import { Information } from '@prisma/client'

type InformationListProps = {
  informations: Information[]
}

export function InformationList({ informations }: InformationListProps) {
  return (
    <Stack spacing={2} sx={{ m: 2, width: '680px' }}>
      {informations.map((information, index) => (
        <InformationCard key={index} information={information} />
      ))}
    </Stack>
  )
}
