import { InformationListArticleList } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof InformationListArticleList> = {
  title: 'templates/InformationListArticleList',
  component: InformationListArticleList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InformationListArticleList>

const Template: Story = {}

export const Default: Story = {
  args: {
    informations: [
      {
        id: 1,
        title: 'example text',
        body: 'example text',
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        importance: 'Low',
        authorId: 1,
      },
      {
        id: 2,
        title: 'example text2',
        body: 'example text2',
        createdAt: '2023-06-28T06:06:12.028Z',
        updatedAt: '2023-06-28T06:06:12.028Z',
        importance: 'Middle',
        authorId: 1,
      },
    ],
  },
}
