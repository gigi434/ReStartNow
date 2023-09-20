import { rest } from 'msw'
import { mockPrefetures } from './mockData'

export const mockGetPrefectures = rest.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/prefectures`,
  async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockPrefetures))
  }
)
