import { Card } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

const Template: Story = {
  args: {
    image: '/municipality/chiba/ichikawa.jpg',
    title: 'example text',
    description:
      'Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica',
  },
}

export const Clickable: Story = {
  args: {
    ...Template.args,
    clickable: true,
  },
}

export const NonClickable: Story = {
  ...Template,
}
