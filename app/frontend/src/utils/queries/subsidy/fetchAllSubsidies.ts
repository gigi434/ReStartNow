import axios, { AxiosError } from 'axios'
import type { Subsidy } from '@prisma/client'

export async function fetchAllSubsidies() {
  try {
    const { data: subsidies } = await axios.get<Subsidy[]>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/subsidies`
        : `${process.env.API_SERVER_URL}/subsidies`
    )

    if (!subsidies || subsidies.length === 0) {
      console.log('subsidies: ' + subsidies)
      throw new Error('Network response was not ok')
    }

    return subsidies ?? []
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
    return []
  }
}
