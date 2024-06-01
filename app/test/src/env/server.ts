import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    /**
     * @description デプロイしている環境
     */
    NODE_ENV: z.enum(['development', 'test', 'production']),
    /**
     * @description 自動テストするかどうかのフラグ
     */
    CI: z.preprocess(
      (value) => value === 'true' || value === 'false',
      z.boolean(),
    ),
    /**
     * @description フロントエンドを提供しているサーバーのURL
     */
    FRONTEND_SERVER_URL: z.string().url(),
  },
  runtimeEnv: process.env,
})
