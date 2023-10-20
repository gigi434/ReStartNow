import { rest } from 'msw'
import { mockSubsidies } from './mockData'

export const mockGetSubsidyByMunicipalityId = rest.get(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/municipalities/:municipalityId/subsidies`,
  async (req, res, ctx) => {
    // 注意　パラメータが配列オブジェクトなのか不明のためstring | read only string[]として型推論するため型アサーションを使用する
    const municipalityId = req.params.municipalityId as string
    // 配列オブジェクトからパラメータのidを持つmunicipalityを見つける
    const subsidies = mockSubsidies.filter(
      (subsidy) => subsidy.municipalityId === parseInt(municipalityId)
    )

    const response = await res(ctx.status(200), ctx.json(subsidies))
    return response
  }
)
