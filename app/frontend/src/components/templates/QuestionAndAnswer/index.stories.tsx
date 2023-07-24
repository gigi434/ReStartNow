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
  args: {
    subsidyId: 3,
  },
}

export const Default: Story = { ...Template }
