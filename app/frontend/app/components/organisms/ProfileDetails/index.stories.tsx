import { ProfileDetails } from '../../index'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof ProfileDetails> = {
  title: 'organisms/ProfileDetails',
  component: ProfileDetails,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProfileDetails>

export const Default: Story = {}
