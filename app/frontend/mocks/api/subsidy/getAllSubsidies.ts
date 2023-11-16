import { rest } from 'msw'
import { mockSubsidies } from './mockData'

export const mockGetAllSubsidies = rest.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/subsidies`,
  async (req, res, ctx) => {
    const response = await res(ctx.status(200), ctx.json(mockSubsidies))
    return response
  }
)
