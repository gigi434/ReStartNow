import { IntroduceFeatures } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof IntroduceFeatures> = {
  title: 'organisms/IntroduceFeatures',
  component: IntroduceFeatures,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof IntroduceFeatures>

const Template: Story = {}

export const Default: Story = {
  ...Template,
}
