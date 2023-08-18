import { useQuery } from 'react-query'
import { ClientSidePrefecture } from '@/src/types'
import axios from 'axios'

async function fetchPrefectures() {
  const { data } = await axios.get<ClientSidePrefecture[]>(
    process.env.NODE_ENV === 'development' ? `/prefectures` : `/api/prefectures`
  )
  return data
}

export function useFetchPrefectures() {
  return useQuery<ClientSidePrefecture[], Error>({
    queryKey: 'prefectures',
    queryFn: fetchPrefectures,
    staleTime: 0,
    refetchOnWindowFocus: false,
  })
}
