import TextField from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextField> = {
  title: 'Atomic/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'example text',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
      default: 'standard',
    },
    disabled: {
      control: 'boolean',
      default: 'false',
    },
    type: {
      control: 'select',
      options: ['password', 'number', 'search'],
    },
    error: {
      control: 'boolean',
      default: false,
    },
    helperText: {
      control: 'text',
      defaultValue: 'example text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Standard: Story = {
  args: {
    variant: 'standard',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    error: true,
  },
}

export const Medium: Story = {}

export const Small: Story = {
  args: {
    size: 'small',
  },
}
