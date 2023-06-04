import { BasicPagination } from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BasicPagination> = {
  title: 'Atomic/BasicPagination',
  component: BasicPagination,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary'],
    },
    disabled: {
      control: 'boolean',
    },
    count: {
      control: 'number',
    },
    onChange: {
      control: 'function',
    },
  },
}

export default meta
type Story = StoryObj<typeof BasicPagination>

export const Primary: Story = {
  args: {
    count: 10,
  },
}

export const Disabled: Story = {
  args: {
    count: 10,
    disabled: true,
  },
}
