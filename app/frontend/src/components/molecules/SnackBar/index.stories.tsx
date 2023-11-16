import { Snackbar } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof Snackbar> = {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    open: {
      controls: 'boolean',
      defaultValue: false,
    },
    message: {
      controls: 'text',
      defaultValue: 'example text',
    },
    severity: {
      controls: 'select',
      options: ['success', 'info', 'warning', 'error'],
      default: 'info',
    },
  },
}

export default meta
type Story = StoryObj<typeof Snackbar>

export const Default: Story = {
  args: {
    open: true,
    message: 'example text',
  },
}
