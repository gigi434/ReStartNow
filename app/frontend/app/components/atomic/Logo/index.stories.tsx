import { Logo } from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Logo> = {
  title: 'Atomic/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: {},
}
