import { rest } from 'msw'
import { mockQuestions } from './mockData'

export const mockGetQuestions = rest.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/subsidies/:subsidyId/question`,
  async (req, res, ctx) => {
    // 注意　パラメータが配列オブジェクトなのか不明のためstring | read only string[]として型推論するため型アサーションを使用する
    const subsidyId = req.params.subsidyId as string

    const relatedLink = 'https://www.test.com'
    // 配列オブジェクトからパラメータのsubsidyIdを持つquestionsを見つける
    const questions = mockQuestions.filter((question) =>
      question.questionGroupQuestion.some((groupQuestion) =>
        groupQuestion.questionGroup.subsidies.some(
          (subsidy) => subsidy.id === parseInt(subsidyId)
        )
      )
    )

    if (questions.length === 0) {
      return res(
        ctx.status(404),
        ctx.json({ error: 'Not Found such resources' })
      )
    }

    const response = await res(
      ctx.status(200),
      ctx.json({ relatedLink, questions })
    )

    return response
  }
)
