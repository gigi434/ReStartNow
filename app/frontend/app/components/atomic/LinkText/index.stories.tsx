import * as React from 'react'
import LinkText from './index'
import Typography from '@/components/atomic/Typography'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LinkText> = {
  title: 'Atomic/LinkText',
  component: LinkText,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
    },
  },
}

export default meta
type Story = StoryObj<typeof LinkText>

export const Default: Story = {
  args: {
    children: (
      <>
        <Typography variant="body2">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </>
    ),
    underline: 'none',
  },
}
