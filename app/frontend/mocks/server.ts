import { setupServer } from 'msw/node'
import { handlers } from './handler'

// サーバーサイド開発用であり、Node.js向けのサービスワーカー
export const server = setupServer(...handlers)
