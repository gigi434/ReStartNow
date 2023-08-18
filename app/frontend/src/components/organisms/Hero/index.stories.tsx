import { Hero } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Hero> = {
  title: 'organisms/Hero',
  component: Hero,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Hero>

const Template: Story = {}

export const Default: Story = {
  ...Template,
}
