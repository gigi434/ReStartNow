import { Question } from '@prisma/client'

export type ClientSideQuestion = Omit<Question, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}
