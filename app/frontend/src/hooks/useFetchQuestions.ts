import { useQuery } from 'react-query'
import { ClientSideQuestion } from '@/src/types'
import axios from 'axios'

async function fetchQuestions(subsidyId: number) {
  const { data } = await axios.get<ClientSideQuestion[]>(
    process.env.NODE_ENV === 'development'
      ? `/subsidies/${subsidyId}/question`
      : `/api/subsidies/${subsidyId}/question`
  )
  return data
}

export function useFetchQuestions(subsidyId: number) {
  return useQuery<ClientSideQuestion[], Error>(
    'questions',
    () => fetchQuestions(subsidyId),
    {
      staleTime: 0,
    }
  )
}
