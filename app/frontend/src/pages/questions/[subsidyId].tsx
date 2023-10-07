import { QuestionAndAnswer } from '@/src/components'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import type { GetStaticProps, GetStaticPaths } from 'next'
import {
  fetchAllQuestions,
  fetchQuestionsBySubsidyId,
} from '@/src/utils/queries'
import { Question } from '@prisma/client'

type PageProps = {
  questions: Question[]
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
    const questions = await fetchAllQuestions()
    // 最大のidを取得
    const maxId = Math.max(...questions.map((q) => q.subsidyId))

    // maxId回ループを回して、指定されたオブジェクトを生成してpaths配列に追加
    const paths = Array.from({ length: maxId }, (_, index) => {
      return {
        params: { subsidyId: `${index + 1}` }, // indexは0から始まるので、1を足してidとする
      }
    })

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
