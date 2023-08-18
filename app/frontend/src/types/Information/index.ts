import { Information } from '@prisma/client'

export type ClientSideInformation = Omit<
  Information,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}
