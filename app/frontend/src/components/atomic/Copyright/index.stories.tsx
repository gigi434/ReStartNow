import { Copyright } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof Copyright> = {
  title: 'Atomic/Copyright',
  component: Copyright,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Copyright>

export const Default: Story = {}
