import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    CI: z.preprocess((val) => val === 'true' || val === 'false', z.boolean()),
    FRONTEND_SERVER: z.string().url(),
  },
  runtimeEnv: process.env,
})
