import { InformationCard } from '@/src/components'
import React from 'react'
import type { Information } from '@prisma/client'

type InformationListProps = {
  informations: Information[]
}

export function InformationList({ informations }: InformationListProps) {
  return (
    <>
      {informations.map((information) => (
        <InformationCard key={information.title} information={information} />
      ))}
    </>
  )
}
