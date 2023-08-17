import { useQuery } from 'react-query'
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
    queryKey: 'informations',
    queryFn: fetchInformations,
    staleTime: 0,
    refetchOnWindowFocus: false,
  })
}
