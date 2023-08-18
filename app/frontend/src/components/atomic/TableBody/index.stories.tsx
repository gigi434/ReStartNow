import { TableBody } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof TableBody> = {
  title: 'Atoms/TableBody',
  component: TableBody,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TableBody>

export const Default: Story = {}
