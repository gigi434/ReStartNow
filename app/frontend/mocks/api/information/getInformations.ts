import { rest } from 'msw'
import { mockInformations } from './mockData'

export const mockGetInformations = rest.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/informations`,
  async (req, res, ctx) => {
    const response = await res(ctx.status(200), ctx.json(mockInformations))
    return response
  }
)
