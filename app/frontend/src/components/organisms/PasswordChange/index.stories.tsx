import { PasswordChange } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof PasswordChange> = {
  title: 'organisms/PasswordChange',
  component: PasswordChange,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PasswordChange>

export const Default: Story = {}
