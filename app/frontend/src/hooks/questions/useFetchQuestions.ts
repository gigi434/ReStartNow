import { useQuery } from '@tanstack/react-query'
import { ClientSideQuestion } from '@/src/types'
import axios, { AxiosError } from 'axios'

export async function fetchQuestions(subsidyId: number) {
  try {
    const { data: questions } = await axios.get<ClientSideQuestion[]>(
      process.env.NODE_ENV === 'development'
        ? `/subsidies/${subsidyId}/question`
        : `${process.env.API_SERVER_URL}/subsidies/${subsidyId}/questions`
    )

    return questions ?? []
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      return []
    }
  }
}

// export function useFetchQuestions(subsidyId: number) {
//   return useQuery<ClientSideQuestion[], AxiosError>({
//     queryKey: ['questions', subsidyId],
//     queryFn: () => fetchQuestions(subsidyId),
//     staleTime: 1000 * 60, // 1minute
//     refetchOnWindowFocus: false,
//   })
// }
