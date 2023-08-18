import { InformationArticle } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof InformationArticle> = {
  title: 'templates/InformationArticle',
  component: InformationArticle,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InformationArticle>

const Template: Story = {
  args: {
    information: {
      id: 1,
      title: 'example text',
      body: 'example text',
      createdAt: '2023-06-28T06:06:12.028Z',
      updatedAt: '2023-06-28T06:06:12.028Z',
      importance: 'Low',
      authorId: 1,
    },
  },
}

export const Default: Story = {
  ...Template,
}
