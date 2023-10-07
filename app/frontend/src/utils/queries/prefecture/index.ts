import axios, { AxiosError } from 'axios'
import { Prefecture } from '@prisma/client'

export async function fetchPrefectures() {
  try {
    const { data: prefectures } = await axios.get<Prefecture[]>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/prefectures`
        : `${process.env.API_SERVER_URL}/prefectures`
    )

    return prefectures ?? []
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
    return []
  }
}
