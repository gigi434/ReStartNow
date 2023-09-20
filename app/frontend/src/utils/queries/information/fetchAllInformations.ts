import axios, { AxiosError } from 'axios'
import { axiosInstance } from '@/src/utils'
import { Information } from '@prisma/client'

export async function fetchAllInformations() {
  try {
    const { data: informations } = await axios.get<Information[]>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/informations`
        : `${process.env.API_SERVER_URL}/informations`
    )

    if (!informations) {
      throw new AxiosError('Informations fetching error is occurred')
    }

    return informations
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AxiosError(error.message)
    }
    return []
  }
}
