import { rest } from 'msw'

// 仮のお知らせ情報
let mockInformations = [
  {
    id: 1,
    title: 'example text',
    body: 'example text',
    createdAt: '2020/06/28 15:32:21',
    updatedAt: '2020/06/28 15:32:21',
    importance: 'Low',
    authorId: '1',
  },
  {
    id: 2,
    title: 'example text2',
    body: 'example text2',
    createdAt: '2020/04/28 13:43:56',
    updatedAt: '2020/04/28 13:43:56',
    importance: 'Middle',
    authorId: '1',
  },
]
export const mockGetInformations = rest.get(
  '/information',
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockInformations))
  }
)
