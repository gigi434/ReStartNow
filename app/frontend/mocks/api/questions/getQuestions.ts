import { rest } from 'msw'
import { mockQuestions } from './mockData'

export const mockGetQuestions = rest.get(
  '/subsidies/:subsidyId/question',
  async (req, res, ctx) => {
    // 注意　パラメータが配列オブジェクトなのか不明のためstring | read only string[]として型推論するため型アサーションを使用する
    const subsidyId = req.params.subsidyId as string
    // 配列オブジェクトからパラメータのsubsidyIdを持つquestionsを見つける
    const questions = mockQuestions.filter(
      (question) => question.subsidyId === parseInt(subsidyId)
    )
    return res(ctx.status(200), ctx.json(questions))
  }
)
