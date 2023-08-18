import { Municipality } from '@prisma/client'

export type ClientSideMunicipality = Omit<
  Municipality,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}
