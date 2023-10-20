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
        basePath: '/questions/1',
      },
    },
  },
  args: {
    questions: mockQuestions,
  },
}

export const Default: Story = {
  ...Template,
}
