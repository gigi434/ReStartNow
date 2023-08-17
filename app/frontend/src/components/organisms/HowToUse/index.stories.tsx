import { HowToUse } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof HowToUse> = {
  title: 'organisms/HowToUse',
  component: HowToUse,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof HowToUse>

const Template: Story = {}

export const Default: Story = {
  ...Template,
}
