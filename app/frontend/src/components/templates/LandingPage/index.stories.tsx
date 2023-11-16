import { LandingPage } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LandingPage> = {
  title: 'templates/LandingPage',
  component: LandingPage,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LandingPage>

const Template: Story = {}

export const Default: Story = {
  ...Template,
}
