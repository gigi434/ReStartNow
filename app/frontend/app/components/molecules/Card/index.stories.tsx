import { Card } from '@/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    image: '/municipality/chiba/ichikawa.jpg',
    title: 'example text',
    description:
      'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
  },
}
