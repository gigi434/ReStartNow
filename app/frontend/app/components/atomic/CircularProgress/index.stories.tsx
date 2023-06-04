import { CircularProgress } from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CircularProgress> = {
  title: 'Atomic/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary'],
    },
  },
}

export default meta
type Story = StoryObj<typeof CircularProgress>

export const Default: Story = {
  args: {
    color: 'primary',
  },
}
