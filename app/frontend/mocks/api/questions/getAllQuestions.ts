import { rest } from 'msw'
import { mockQuestions } from './mockData'

export const mockGetAllQuestions = rest.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions`,
  async (req, res, ctx) => {
    const response = await res(ctx.status(200), ctx.json(mockQuestions))
    return response
  }
)
