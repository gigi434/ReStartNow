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
        query: { subsidyId: 1 },
      },
    },
  },
  args: {
    questions: mockQuestions,
  },
}

export const Success: Story = { ...Template }
export const FetchingError: Story = {
  ...Template,
  args: {
    questions: [],
  },
}
