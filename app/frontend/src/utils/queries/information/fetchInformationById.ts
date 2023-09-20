import axios, { AxiosError } from 'axios'
import { axiosInstance } from '@/src/utils'
import type { Information } from '@prisma/client'

export async function fetchInformationById(informationId: number) {
  try {
    const { data: information } = await axiosInstance.get<Information>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/informations/${informationId}`
        : `${process.env.API_SERVER_URL}/informations/${informationId}`
    )

    if (!information) {
      throw new AxiosError('Information fetching error is occurred')
    }

    return information
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AxiosError(error.message)
    }
    return []
  }
}
