import { Login } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Login> = {
  title: 'templates/Login',
  component: Login,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Login>

const Template: Story = {
  args: {
    id: 1,
  },
}

export const Default: Story = {
  ...Template,
}
