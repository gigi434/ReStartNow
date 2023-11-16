import { ResetPasswordForm } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof ResetPasswordForm> = {
  title: 'organisms/ResetPasswordForm',
  component: ResetPasswordForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ResetPasswordForm>

export const Default: Story = {}
