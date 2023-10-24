import axios, { AxiosError } from 'axios'
import { Question, Choice, Subsidy } from '@prisma/client'

type QuestionChoice = {
  questionId: number
  choiceId: number
  choice: Choice
}

type ExtendedQuestion = Question & {
  questionChoice: QuestionChoice[]
}

export type QuestionsBySubsidyId = Pick<Subsidy, 'relatedLink'> & {
  questions: ExtendedQuestion[]
}

export async function fetchQuestionsBySubsidyId(subsidyId: number) {
  try {
    const { data: fetchedQuestions } = await axios.get<QuestionsBySubsidyId>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/subsidies/${subsidyId}/question`
        : `${process.env.API_SERVER_URL}/subsidies/${subsidyId}/questions`
    )

    if (!fetchedQuestions || fetchedQuestions.questions.length === 0) {
      throw new Error('Questions fetching error is occurred')
    }

    return fetchedQuestions ?? []
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AxiosError(error.message)
    }
    return []
  }
}
