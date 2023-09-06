import { useQuery } from '@tanstack/react-query'
import { ClientSideInformation } from '@/src/types'
import axios from 'axios'

async function fetchInformations() {
  const { data } = await axios.get<ClientSideInformation[]>(
    process.env.NODE_ENV === 'development'
      ? `/informations`
      : `/api/informations`
  )
  return data
}

export function useFetchInformations() {
  return useQuery<ClientSideInformation[], Error>({
    queryKey: ['informations'],
    queryFn: fetchInformations,
    staleTime: 1000 * 60, // 1minute
    refetchOnWindowFocus: false,
  })
}
