import { useQuery } from '@tanstack/react-query'
import { ClientSidePrefecture } from '@/src/types'

export async function fetchPrefectures() {
  try {
    const response = await fetch(
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3000/prefectures`
        : `${process.env.API_SERVER_URL}/prefectures`
    )

    const prefectures = await response.json()

    return prefectures ?? []
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`)
    }
    return []
  }
}

export function useFetchPrefectures() {
  return useQuery<ClientSidePrefecture[], Error>({
    queryKey: ['prefectures'],
    queryFn: fetchPrefectures,
    staleTime: 1000 * 60, // 1minute
    refetchOnWindowFocus: false,
  })
}
