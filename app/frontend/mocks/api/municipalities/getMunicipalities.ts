import { rest } from 'msw'
import { mockMunicipalities } from './mockData'

export const mockGetMunicipalities = rest.get(
  '/municipalities',
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockMunicipalities))
  }
)
