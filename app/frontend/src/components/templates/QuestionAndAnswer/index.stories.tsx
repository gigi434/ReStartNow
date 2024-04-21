import { QuestionAndAnswer } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { mockQuestions } from '@/mocks/api/questions/mockData'

const meta: Meta<typeof QuestionAndAnswer> = {
  title: 'templates/QuestionAndAnswer',
  component: QuestionAndAnswer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof QuestionAndAnswer>

const Template: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/questions/[subsidyId]',
        query: { subsidyId: 3 },
      },
    },
  },
  args: {
    fetchedQuestions: {
      relatedLink: 'https://www.city.ichikawa.lg.jp/wel07/0000376345.html',
      questions: mockQuestions.filter((question) =>
        question.questionGroupQuestion.some((groupQuestion) =>
          groupQuestion.questionGroup.subsidies.some(
            (subsidy) => subsidy.id === parseInt('3')
          )
        )
      ),
    },
  },
}

export const Success: Story = { ...Template }
export const Error: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/questions/[subsidyId]',
        query: { subsidyId: 2 },
      },
    },
  },
  args: {
    fetchedQuestions: {
      relatedLink: 'https://www.city.ichikawa.lg.jp/wel07/0000376345.html',
      questions: mockQuestions.filter((question) =>
        question.questionGroupQuestion.some((groupQuestion) =>
          groupQuestion.questionGroup.subsidies.some(
            (subsidy) => subsidy.id === parseInt('2')
          )
        )
      ),
    },
  },
}
export const FetchingError: Story = {
  ...Template,
  args: {
    fetchedQuestions: {
      relatedLink: '',
      questions: [],
    },
  },
}
