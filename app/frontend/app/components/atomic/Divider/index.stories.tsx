import { Divider } from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Divider> = {
  title: 'Atomic/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    textAlign: {
      control: 'select',
      options: ['center', 'right', 'left'],
      defaultValue: 'center',
    },
    variant: {
      control: 'select',
      options: ['fullwidth', 'middle', 'inset'],
    },
    children: {
      control: 'text',
      defaultValue: 'example',
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const TextAlign: Story = {
  args: {},
}

export const Variant: Story = {
  args: {
    variant: 'fullWidth',
  },
}
