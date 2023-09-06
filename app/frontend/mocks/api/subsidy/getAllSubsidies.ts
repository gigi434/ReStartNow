import { rest } from 'msw'
import { mockSubsidies } from './mockData'

export const mockGetAllSubsidies = rest.get(
  `http://localhost:3000/api/subsidies`,
  async (req, res, ctx) => {
    const response = await res(ctx.status(200), ctx.json(mockSubsidies))
    return response
  }
)
