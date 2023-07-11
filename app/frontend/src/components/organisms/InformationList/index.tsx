import { Stack } from '@mui/material'
import { InformationCard } from '@/src/components'
import * as React from 'react'
import type { ClientSideInformation } from '@/src/types'
type InformationListProps = {
  informations: ClientSideInformation[]
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
