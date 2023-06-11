import { SignupConfirmation } from '../../index'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof SignupConfirmation> = {
  title: 'organisms/SignupConfirmation',
  component: SignupConfirmation,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SignupConfirmation>

export const Default: Story = {}
