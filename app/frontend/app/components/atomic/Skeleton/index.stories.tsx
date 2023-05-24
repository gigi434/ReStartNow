import Skeleton from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Skeleton> = {
  title: 'Atomic/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'rounded', 'circular'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Text: Story = {
  args: {
    variant: 'text',
    width: 40,
    height: 40,
  },
}

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
}

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 210,
    height: 60,
  },
}

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 210,
    height: 60,
  },
}
