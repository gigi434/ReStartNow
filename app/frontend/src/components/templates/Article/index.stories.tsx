import { Article } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Article> = {
  title: 'templates/Article',
  component: Article,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Article>

const Template: Story = {
  args: {
    id: 1,
  },
}

export const Default: Story = {
  ...Template,
}
