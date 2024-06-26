import { Footer } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof Footer> = {
  title: 'organisms/Footer',
  component: Footer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {}
