import { PasswordChangeForm } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PasswordChangeForm> = {
  title: 'organisms/PasswordChangeForm',
  component: PasswordChangeForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PasswordChangeForm>

const Template: Story = {}

export const Success: Story = {
  ...Template,
}

export const Error: Story = {
  ...Template,
}
