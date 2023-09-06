import { ClientSideAnswer } from '@/src/types'

type PostResultByQuestionsResult = Pick<ClientSideAnswer, 'answers'> & {
  subsidyId: number
}

export async function postResultByQuestions({
  answers,
  subsidyId,
}: PostResultByQuestionsResult) {
  if (!answers) {
    throw new Error('no answers')
  }

  try {
    const response = await fetch(
      process.env.NODE_ENV === 'development'
        ? `/result/${subsidyId}`
        : `${process.env.NEXT_PUBLIC_API_BASE_PATH}/result/${subsidyId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      }
    )

    const data = await response.json()

    return data
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}
