import { LoginForm } from '../../index'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof LoginForm> = {
  title: 'organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LoginForm>

export const Default: Story = {}
