import { useQuery } from '@tanstack/react-query'
import { ClientSideMunicipality } from '@/src/types'
import axios, { AxiosError } from 'axios'

export async function fetchMunicipalities() {
  try {
    const { data } = await axios.get<ClientSideMunicipality[]>(
      process.env.NODE_ENV === 'development'
        ? `/municipalities`
        : `${process.env.API_SERVER_URL}/region`
    )
    return data
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message)

    return []
  }
}

export function useFetchMunicipalities() {
  return useQuery<ClientSideMunicipality[], AxiosError>({
    queryKey: ['municipalities'],
    queryFn: fetchMunicipalities,
    staleTime: 1000 * 60, // 1minute
    refetchOnWindowFocus: false,
  })
}
