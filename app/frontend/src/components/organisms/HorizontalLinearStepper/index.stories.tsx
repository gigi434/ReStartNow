import { HorizontalLinearStepper } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { mockQuestions } from '@/mocks/api/questions/mockData'
const meta: Meta<typeof HorizontalLinearStepper> = {
  title: 'organisms/HorizontalLinearStepper',
  component: HorizontalLinearStepper,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof HorizontalLinearStepper>

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

export const Default: Story = {
  ...Template,
}
