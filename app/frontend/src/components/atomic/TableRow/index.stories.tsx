import { TableRow } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof TableRow> = {
  title: 'Atoms/TableRow',
  component: TableRow,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TableRow>

export const Default: Story = {}
