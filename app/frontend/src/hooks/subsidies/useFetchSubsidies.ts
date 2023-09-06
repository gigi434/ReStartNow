import { ClientSideSubsidy } from '@/src/types'
import axios from 'axios'

export async function fetchSubsidies(municipalityId: number) {
  try {
    const { data: subsidies } = await axios.get<ClientSideSubsidy[]>(
      process.env.NODE_ENV === 'development'
        ? `/municipalities/${municipalityId}/subsidies`
        : `${process.env.API_SERVER_URL}/subsidies/${municipalityId}`
    )

    return subsidies ?? []
  } catch (error) {
    console.log(error)
    if (error instanceof Error) throw new Error(error.message)
    return []
  }
}

// export function useFetchSubsidies(municipalityId: number) {
//   return useQuery<ClientSideSubsidy[], Error>({
//     queryKey: ['subsidies', municipalityId],
//     queryFn: fetchSubsidies(municipalityId),
//     staleTime: 1000 * 60, // 1minute
//     refetchOnWindowFocus: false,
//   })
// }
