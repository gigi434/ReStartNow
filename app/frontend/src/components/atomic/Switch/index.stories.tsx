import { Switch } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
        'default',
      ],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
      default: 'false',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Medium: Story = {}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Required: Story = {
  args: {
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
