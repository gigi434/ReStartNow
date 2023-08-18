import { SocialButton } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof SocialButton> = {
  title: 'Molecules/SocialButton',
  component: SocialButton,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SocialButton>

export const Twitter: Story = {
  args: { socialApplicationName: 'twitter', href: 'https://twitter.com' },
}
