import axios, { AxiosError } from 'axios'
import type { Answer } from '@prisma/client'

type PostResultByQuestionsResult = Pick<Answer, 'answers'> & {
  subsidyId: number
}

type PostResultByQuestionsResponse = {
  amount: number | boolean | null
}

export async function postResultByQuestions({
  answers,
  subsidyId,
}: PostResultByQuestionsResult): Promise<PostResultByQuestionsResponse> {
  if (!answers) {
    throw new Error('no answers')
  }

  try {
    const { data: response } = await axios.post<PostResultByQuestionsResponse>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/result/${subsidyId}`
        : `${process.env.NEXT_PUBLIC_API_BASE_PATH}/result/${subsidyId}`,
      answers
    )
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AxiosError(error.message)
    }
    return { amount: null }
  }
}
