import { PasswordChangeConfirmation } from '../../index'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof PasswordChangeConfirmation> = {
  title: 'organisms/PasswordChangeConfirmation',
  component: PasswordChangeConfirmation,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof PasswordChangeConfirmation>

export const Default: Story = {}
