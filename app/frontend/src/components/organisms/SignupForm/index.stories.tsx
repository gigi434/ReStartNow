import { SignupForm } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof SignupForm> = {
  title: 'organisms/SignupForm',
  component: SignupForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SignupForm>

export const Default: Story = {}
