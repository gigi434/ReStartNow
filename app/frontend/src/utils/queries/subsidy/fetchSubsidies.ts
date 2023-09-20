import axios from 'axios'
import type { Subsidy } from '@prisma/client'

export async function fetchSubsidies(municipalityId: number) {
  try {
    const { data: subsidies } = await axios.get<Subsidy[]>(
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/municipalities/${municipalityId}/subsidies`
        : `${process.env.API_SERVER_URL}/subsidies/${municipalityId}`
    )

    return subsidies ?? []
  } catch (error) {
    console.log(error)
    if (error instanceof Error) throw new Error(error.message)
    return []
  }
}
