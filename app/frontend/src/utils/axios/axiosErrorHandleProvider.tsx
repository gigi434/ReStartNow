import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import React from 'react'

interface AxiosErrorHandleProviderProps {
  children: ReactNode
}
/** axiosの例外処理におけるエラー処理共通化するために必要な関数オブジェクト */
export const AxiosErrorHandleProvider = ({
  children,
}: AxiosErrorHandleProviderProps) => {
  const router = useRouter()

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 404) {
          router.push('/404')
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.response.eject(interceptor)
    }
  }, [router])

  return <>{children}</>
}
