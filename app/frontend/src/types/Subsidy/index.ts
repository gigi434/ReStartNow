import { Subsidy } from '@prisma/client'

export type ClientSideSubsidy = Omit<Subsidy, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}
