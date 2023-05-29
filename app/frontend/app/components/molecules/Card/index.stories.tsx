import * as React from 'react'
import Card from './index'
import Typography from '@/components/atomic/Typography'
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
    cardImage: '/municipality/chiba/ichikawa.jpg',
    cardImageAlt: 'example text',
    cardContent: (
      <>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </>
    ),
  },
}
