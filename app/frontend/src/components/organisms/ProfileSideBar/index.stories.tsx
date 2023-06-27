import { ProfileSideBar } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof ProfileSideBar> = {
  title: 'organisms/ProfileSideBar',
  component: ProfileSideBar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProfileSideBar>

export const Default: Story = {}
