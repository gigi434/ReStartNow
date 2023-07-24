import { useQuery } from 'react-query'
import { ClientSideSubsidy } from '@/src/types'
import axios from 'axios'

async function fetchSubsidies(municipalityId: number) {
  const { data } = await axios.get<ClientSideSubsidy[]>(
    process.env.NODE_ENV === 'development'
      ? `/municipalities/${municipalityId}/subsidies`
      : `/api/municipalities/${municipalityId}/subsidies`
  )
  return data
}

export function useFetchSubsidies(municipalityId: number) {
  return useQuery<ClientSideSubsidy[], Error>(
    'subsidies',
    () => fetchSubsidies(municipalityId),
    {
      staleTime: 0,
    }
  )
}
