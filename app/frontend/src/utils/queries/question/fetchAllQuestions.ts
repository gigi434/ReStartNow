import axios from 'axios'
import { Question } from '@prisma/client'

export async function fetchAllQuestions() {
  try {
    const { data: questions } = await axios.get<Question[]>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions`
        : `${process.env.API_SERVER_URL}/questions`
    )

    if (!questions || questions.length === 0) {
      console.log(questions)
      throw new Error('Missing all questions')
    }

    return questions ?? []
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    return []
  }
}
