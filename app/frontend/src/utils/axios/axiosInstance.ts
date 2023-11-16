import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {}
export const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_PATH

config.baseURL = baseURL

export const axiosInstance = axios.create(config)
