import { Header } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof Header> = {
  title: 'organisms/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {}
