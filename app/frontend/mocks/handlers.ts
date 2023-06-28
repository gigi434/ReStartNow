import {
  mockGetInformations,
  mockChangePassword,
  mockLogin,
  mockGetOneInformation,
} from './api'

export const handlers = [
  mockLogin,
  mockChangePassword,
  mockGetInformations,
  mockGetOneInformation,
]
