import { Answer } from '@prisma/client'

export type ClientSideAnswer = Omit<Answer, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}
