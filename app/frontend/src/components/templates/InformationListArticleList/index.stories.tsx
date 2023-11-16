import { InformationListArticleList } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof InformationListArticleList> = {
  title: 'templates/InformationListArticleList',
  component: InformationListArticleList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InformationListArticleList>

const Template: Story = {
  parameters: {
    nextjs: {
      router: {
        basePath: '/informations/1',
      },
    },
  },
  args: {
    informations: [
      {
        id: 1,
        title: 'example text',
        body: 'example text',
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        importance: 'Low',
        authorId: 1,
      },
      {
        id: 2,
        title: 'example text2',
        body: 'example text2',
        createdAt: new Date('2020/06/28 15:32:21'),
        updatedAt: new Date('2020/06/28 15:32:21'),
        importance: 'Middle',
        authorId: 1,
      },
    ],
  },
}

export const Default: Story = {
  ...Template,
}
