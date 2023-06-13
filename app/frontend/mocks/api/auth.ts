import { MockedRequest, ResponseResolver, restContext } from 'msw'

export const mockLogin: ResponseResolver<
  MockedRequest,
  typeof restContext
> = async (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ success: true }))
}
