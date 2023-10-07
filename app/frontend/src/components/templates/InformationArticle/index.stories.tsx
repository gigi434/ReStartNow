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
  parameters: {
    nextjs: {
      router: {
        basePath: '/informations/1',
      },
    },
  },
  args: {
    information: {
      id: 1,
      title: 'example text',
      body: 'example text',
      createdAt: new Date('2020/06/28 15:32:21'),
      updatedAt: new Date('2020/06/28 15:32:21'),
      importance: 'Low',
      authorId: 1,
    },
  },
}

export const Default: Story = {
  ...Template,
}
