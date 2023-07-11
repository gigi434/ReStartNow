import { rest } from 'msw'
import { mockInformations } from './mockData'

export const mockGetOneInformation = rest.get(
  '/informations/:id',
  async (req, res, ctx) => {
    // 注意　パラメータが配列オブジェクトなのか不明のためstring | read only string[]として型推論するため型アサーションを使用する
    const id = req.params.id as string
    // 配列オブジェクトからパラメータのidを持つinformationを見つける
    const information = mockInformations.find(
      (information) => information.id === parseInt(id)
    )
    return res(ctx.status(200), ctx.json(information))
  }
)
