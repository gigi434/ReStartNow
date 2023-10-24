import { mockInformations } from '@/mocks/api/information/mockData'
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
    information: mockInformations[1],
  },
}

export const Default: Story = {
  ...Template,
}
