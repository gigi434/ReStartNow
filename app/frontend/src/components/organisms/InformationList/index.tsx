import { InformationCard } from '@/src/components'
import * as React from 'react'
import type { ClientSideInformation } from '@/src/types'
type InformationListProps = {
  informations: ClientSideInformation[]
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
