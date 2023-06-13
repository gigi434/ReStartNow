import { rest } from 'msw'
import { mockLogin } from './api/auth'

export const handlers = [rest.post(`/login`, mockLogin)]
