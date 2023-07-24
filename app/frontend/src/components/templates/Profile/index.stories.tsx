import { Profile } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Profile> = {
  title: 'templates/Profile',
  component: Profile,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Profile>

const Template: Story = {}

export const Default: Story = {
  ...Template,
}
