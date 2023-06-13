import { setupWorker } from 'msw'
import { handlers } from './handler'

// フロントエンド開発用であり、ブラウザ向けのサービスワーカー
export const worker = setupWorker(...handlers)
