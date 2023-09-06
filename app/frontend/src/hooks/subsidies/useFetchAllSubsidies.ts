import { useQuery } from '@tanstack/react-query'
import { ClientSideSubsidy } from '@/src/types'
import axios from 'axios'

export async function fetchAllSubsidies() {
  try {
    const { data: subsidies } = await axios.get<ClientSideSubsidy[]>(
      process.env.NODE_ENV === 'development'
        ? `/subsidies`
        : `${process.env.API_SERVER_URL}/subsidies`
    )

    if (!subsidies || subsidies.length === 0) {
      console.log('subsidies: ' + subsidies)
      throw new Error('Network response was not ok')
    }

    return subsidies ?? []
  } catch (error) {
    console.log(error)
    if (error instanceof Error) throw new Error(error.message)

    return []
  }
}

export function useFetchAllSubsidies() {
  return useQuery<ClientSideSubsidy[], Error>({
    queryKey: ['subsidies'],
    queryFn: fetchAllSubsidies,
    staleTime: 1000 * 60, // 1minute
    refetchOnWindowFocus: false,
  })
}
