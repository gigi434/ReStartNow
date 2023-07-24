import { useQuery } from 'react-query'
import { ClientSideMunicipality } from '@/src/types'
import axios from 'axios'

async function fetchMunicipalities() {
  const { data } = await axios.get<ClientSideMunicipality[]>(
    process.env.NODE_ENV === 'development'
      ? `/municipalities`
      : `/api/municipalities`
  )
  return data
}

export function useFetchMunicipalities() {
  return useQuery<ClientSideMunicipality[], Error>({
    queryKey: 'municipalities',
    queryFn: fetchMunicipalities,
    staleTime: 0,
    refetchOnWindowFocus: false,
  })
}
