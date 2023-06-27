import { rest } from 'msw'

export const mockLogin = rest.post(`/login`, async (_, res, ctx) => {
  return res(ctx.status(200), ctx.json({ success: true }))
})
