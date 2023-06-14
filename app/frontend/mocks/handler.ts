import { rest } from 'msw'
import { mockLogin } from './api/auth'

export const handlers = { auth: rest.post(`/login`, mockLogin) }
