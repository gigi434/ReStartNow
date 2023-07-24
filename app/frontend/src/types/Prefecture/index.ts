import { Prefecture } from '@prisma/client'

export type ClientSidePrefecture = Omit<
  Prefecture,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}
