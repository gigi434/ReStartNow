import { TableHead } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof TableHead> = {
  title: 'Atoms/TableHead',
  component: TableHead,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TableHead>

export const Default: Story = {}
