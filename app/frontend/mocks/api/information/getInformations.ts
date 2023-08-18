import { rest } from 'msw'
import { mockInformations } from './mockData'

export const mockGetInformations = rest.get(
  '/informations',
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockInformations))
  }
)
