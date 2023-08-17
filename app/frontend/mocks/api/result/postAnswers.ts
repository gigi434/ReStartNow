import { rest } from 'msw'

type BodyType = {
  isResidency: 'true' | 'false'
  haveChildcareInterview: 'true' | 'false'
  havePregnancyInterview: 'true' | 'false'
}

export const mockPostAnswers = rest.post<BodyType>(
  '/result/:subsidyId',
  async (req, res, ctx) => {
    const subsidyId = req.params.subsidyId as string

    if (subsidyId === '3') {
      const { isResidency, haveChildcareInterview, havePregnancyInterview } =
        (await req.json()) as BodyType

      // 文字列型を論理型に変換
      const convertedIsResidency = isResidency === 'true'
      const convertedHaveChildcareInterview = haveChildcareInterview === 'true'
      const convertedHavePregnancyInterview = havePregnancyInterview === 'true'

      // 住民票がなければ受給要件に合致しない
      if (!convertedIsResidency) {
        return res(ctx.json({ amount: false }))
      }

      // 妊娠届出時と出生届出時ともに面談を行っているのであればすでに全額受け取り済みと判断する
      if (convertedHaveChildcareInterview && convertedHavePregnancyInterview) {
        return res(ctx.json({ amount: 0 }))
      }

      // 妊娠届出時と出生届出時どちらか面談を行っているのであれば
      if (convertedHaveChildcareInterview || convertedHavePregnancyInterview) {
        return res(ctx.json({ amount: 50000 }))
      }
      // 妊娠届出時と出生届出時ともに面談を行っていないなら全額受給金額を返す
      return res(ctx.json({ amount: 100000 }))
    }
    return res(ctx.status(404), ctx.json({ error: 'Not Found such resources' }))
  }
)
