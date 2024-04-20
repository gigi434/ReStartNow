import { Snackbar } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof Snackbar> = {
  title: 'Molecules/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    notification: {
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
  },
}

export default meta
type Story = StoryObj<typeof Snackbar>

const Template: Story = {
  args: {
    notification: {
      id: 1,
      open: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit nisl ac risus sagittis vestibulum.',
      severity: 'info',
    },
    onClose: (id) => alert(`Dismissing Notification with id: ${id}`),
  },
}
export const Info: Story = {
  ...Template,
}
export const Success: Story = {
  ...Template,
  args: {
    notification: {
      id: 1,
      open: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit nisl ac risus sagittis vestibulum.',
      severity: 'success',
    },
  },
}
export const Warning: Story = {
  ...Template,
  args: {
    notification: {
      id: 1,
      open: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit nisl ac risus sagittis vestibulum.',
      severity: 'warning',
    },
  },
}
export const Error: Story = {
  ...Template,
  args: {
    notification: {
      id: 1,
      open: true,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit nisl ac risus sagittis vestibulum.',
      severity: 'error',
    },
  },
}
