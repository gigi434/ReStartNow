import { ProgressBar } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof ProgressBar> = {
  title: 'molecules/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    progress: 33,
  },
}
