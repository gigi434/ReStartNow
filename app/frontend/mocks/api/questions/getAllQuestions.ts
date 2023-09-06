import { rest } from 'msw'
import { mockQuestions } from './mockData'

export const mockGetAllQuestions = rest.get(
  `/questions`,
  async (req, res, ctx) => {
    const response = await res(ctx.status(200), ctx.json(mockQuestions))
    return response
  }
)
