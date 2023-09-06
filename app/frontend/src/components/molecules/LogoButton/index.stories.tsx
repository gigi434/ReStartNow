import { LogoButton } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof LogoButton> = {
  title: 'molecules/LogoButton',
  component: LogoButton,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LogoButton>

export const Default: Story = {}
