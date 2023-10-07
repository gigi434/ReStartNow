import { rest } from 'msw'
import { mockMunicipalities } from './mockData'

export const mockGetMunicipalities = rest.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/municipalities`,
  async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json(mockMunicipalities))
  }
)
