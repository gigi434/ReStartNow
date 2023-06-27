import { FAQ } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof FAQ> = {
  title: 'organisms/FAQ',
  component: FAQ,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof FAQ>

export const Default: Story = {}
