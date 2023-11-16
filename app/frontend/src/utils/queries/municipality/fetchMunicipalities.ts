import axios, { AxiosError } from 'axios'
import { Municipality } from '@prisma/client'

export async function fetchMunicipalities() {
  try {
    const { data } = await axios.get<Municipality[]>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/municipalities`
        : `${process.env.API_SERVER_URL}/region`
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AxiosError(error.message)
    }
    return []
  }
}
