import { rest } from 'msw'

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

export const mockGetOneInformation = rest.get(
  '/information/:id',
  async (req, res, ctx) => {
    // パラメータが配列オブジェクトなのか不明のためstring | read only string[]として型推論してしまう
    const id = req.params.id as string
    // 配列オブジェクトからパラメータのidを持つinformationを見つける
    const information = mockInformations.find(
      (information) => information.id === parseInt(id)
    )
    return res(ctx.status(200), ctx.json(information))
  }
)
