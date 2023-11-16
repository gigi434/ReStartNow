import { MediaCard } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MediaCard> = {
  title: 'Molecules/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MediaCard>

export const Default: Story = {
  args: {
    image: '/LP/Illustration - pavan 2950_512w.png',
    title:
      'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
  },
}
