import { TablePagination } from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TablePagination> = {
  title: 'Atomic/TablePagination',
  component: TablePagination,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof TablePagination>

export const Default: Story = {
  args: {
    count: 100,
  },
}
