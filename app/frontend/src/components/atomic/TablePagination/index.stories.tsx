import { TablePagination } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TablePagination> = {
  title: 'Atoms/TablePagination',
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
