import { rest } from 'msw'
import { mockSubsidies } from './mockData'

export const mockGetSubsidies = rest.get(
  '/municipalities/:municipalityId/subsidies',
  async (req, res, ctx) => {
    // 注意　パラメータが配列オブジェクトなのか不明のためstring | read only string[]として型推論するため型アサーションを使用する
    const municipalityId = req.params.municipalityId as string
    // 配列オブジェクトからパラメータのidを持つinformationを見つける
    const subsidies = mockSubsidies.find(
      (subsidy) => subsidy.id === parseInt(municipalityId)
    )
    return res(ctx.status(200), ctx.json(subsidies))
  }
)
