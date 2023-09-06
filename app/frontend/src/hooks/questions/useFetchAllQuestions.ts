import { useQuery } from '@tanstack/react-query'
import { ClientSideQuestion } from '@/src/types'
import axios from 'axios'

export async function fetchAllQuestions() {
  try {
    const { data: questions } = await axios.get<ClientSideQuestion[]>(
      process.env.NODE_ENV === 'development'
        ? `/questions`
        : `${process.env.API_SERVER_URL}/questions`
    )

    if (!questions || questions.length === 0) {
      console.log(questions)
      throw new Error('Missing all questions')
    }

    return questions ?? []
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    return []
  }
}
// export async function fetchAllQuestions() {
//   const data: ClientSideQuestion[] = [
//     {
//       id: 1,
//       answerType: 'boolean',
//       text: '現在住んでいる市町区村の住民票がある',
//       subsidyId: 1,
//       createdAt: '2023-06-28T06:06:12.028Z',
//       updatedAt: '2023-06-28T06:06:12.028Z',
//       propertyName: 'isResidency',
//     },
//     {
//       id: 2,
//       answerType: 'boolean',
//       text: '出生届出後に面談を行った',
//       subsidyId: 1,
//       createdAt: '2023-06-28T06:06:12.028Z',
//       updatedAt: '2023-06-28T06:06:12.028Z',
//       propertyName: 'haveChildcareInterview',
//     },
//     {
//       id: 3,
//       answerType: 'boolean',
//       text: '妊娠届出時に面談を行った',
//       subsidyId: 1,
//       createdAt: '2023-06-28T06:06:12.028Z',
//       updatedAt: '2023-06-28T06:06:12.028Z',
//       propertyName: 'havePregnancyInterview',
//     },
//   ]

//   return data
// }

// export function useFetchAllQuestions() {
//   return useQuery<ClientSideQuestion[], AxiosError>({
//     queryKey: ['questions'],
//     queryFn: fetchAllQuestions,
//     staleTime: 1000 * 60, // 1minute
//     refetchOnWindowFocus: false,
//   })
// }
