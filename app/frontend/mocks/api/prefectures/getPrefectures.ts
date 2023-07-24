import { rest } from 'msw'
import { mockPrefetures } from './mockData'

export const mockGetPrefectures = rest.get(
  '/prefectures',
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockPrefetures))
  }
)
