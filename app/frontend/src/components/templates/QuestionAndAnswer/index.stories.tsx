import { QuestionAndAnswer } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
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
        basePath: '/profile',
      },
    },
  },
  args: {
    questions: [
      {
        id: 1,
        answerType: 'boolean',
        text: '現在住んでいる市町区村の住民票がある',
        subsidyId: 1,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        propertyName: 'isResidency',
      },
      {
        id: 2,
        answerType: 'boolean',
        text: '出生届出後に面談を行った',
        subsidyId: 1,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        propertyName: 'haveChildcareInterview',
      },
      {
        id: 3,
        answerType: 'boolean',
        text: '妊娠届出時に面談を行った',
        subsidyId: 1,
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        propertyName: 'havePregnancyInterview',
      },
    ],
  },
}

export const Success: Story = { ...Template }
export const Fault: Story = {
  ...Template,
  args: {
    questions: [],
  },
}
