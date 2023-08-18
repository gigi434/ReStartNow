import { TableCell } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof TableCell> = {
  title: 'Atoms/TableCell',
  component: TableCell,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TableCell>

export const Default: Story = {}
