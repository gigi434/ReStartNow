import axios, { AxiosError } from 'axios'
import { Question } from '@prisma/client'

export async function fetchQuestionsBySubsidyId(subsidyId: number) {
  try {
    const { data: questions } = await axios.get<Question[]>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/subsidies/${subsidyId}/question`
        : `${process.env.API_SERVER_URL}/subsidies/${subsidyId}/questions`
    )

    if (!questions || questions.length === 0) {
      throw new Error('Questions fetching error is occurred')
    }

    return questions ?? []
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AxiosError(error.message)
    }
    return []
  }
}
