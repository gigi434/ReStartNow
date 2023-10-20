import { QuestionAndAnswer } from '@/src/components'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import type { GetStaticProps, GetStaticPaths } from 'next'
import {
  ExtendedQuestion,
  fetchAllSubsidies,
  fetchQuestionsBySubsidyId,
} from '@/src/utils/queries'

type PageProps = {
  questions: ExtendedQuestion[]
}

export default function Page({ questions }: PageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <CircularProgress />
  }

  return <QuestionAndAnswer questions={questions ?? []} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const subsidies = await fetchAllSubsidies()

    const paths = subsidies.map((subsidy) => ({
      params: { subsidyId: `${subsidy.id}` },
    }))

    return { paths, fallback: false }
  } catch (err) {
    throw new Error('Questions fetching is occurred')
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const subsidyId = context?.params?.subsidyId as string

  const questions = await fetchQuestionsBySubsidyId(Number(subsidyId))

  return {
    props: {
      questions,
    },
  }
}
