import { rest } from 'msw'
import { mockInformations } from './mockData'

export const mockGetOneInformation = rest.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/informations/:informationId`,
  async (req, res, ctx) => {
    // 注意　パラメータが配列オブジェクトなのか不明のためstring | read only string[]として型推論するため型アサーションを使用する
    const informationId = req.params.informationId as string
    // 配列オブジェクトからパラメータのidを持つinformationを見つける
    const information = mockInformations.find(
      (information) => information.id === Number(informationId)
    )
    return await res(ctx.status(200), ctx.json(information))
  }
)
