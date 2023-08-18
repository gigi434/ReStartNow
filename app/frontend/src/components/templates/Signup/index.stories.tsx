import { Signup } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Signup> = {
  title: 'templates/Signup',
  component: Signup,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Signup>

const Template: Story = {
  args: {
    id: 1,
  },
}

export const Default: Story = {
  ...Template,
}
