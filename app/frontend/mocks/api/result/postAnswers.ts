import { rest } from 'msw'

type BodyType = {
  isResidency: boolean
  haveChildcareInterview: boolean
  havePregnancyInterview: boolean
}

export const mockPostAnswers = rest.post<BodyType>(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/result/:subsidyId`,
  async (req, res, ctx) => {
    const subsidyId = req.params.subsidyId as string

    if (!subsidyId) {
      throw new Error(`Missing subsidyId: ${subsidyId}`)
    }

    if (subsidyId === '3') {
      const { isResidency, haveChildcareInterview, havePregnancyInterview } =
        (await req.json()) as BodyType

      // 2秒遅延させる
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 住民票がなければ受給要件に合致しない
      if (isResidency !== true) {
        return await res(ctx.json({ amount: false }))
      }

      // 妊娠届出時と出生届出時ともに面談を行っているのであればすでに全額受け取り済みと判断する
      if (haveChildcareInterview && havePregnancyInterview) {
        return await res(ctx.json({ amount: 0 }))
      }

      // 妊娠届出時と出生届出時どちらか面談を行っているのであれば
      if (haveChildcareInterview || havePregnancyInterview) {
        return await res(ctx.json({ amount: 50000 }))
      }
      // 妊娠届出時と出生届出時ともに面談を行っていないなら全額受給金額を返す
      return await res(ctx.json({ amount: 100000 }))
    }

    return res(ctx.status(400), ctx.json({ message: 'Missing Resources' }));
  }
)
