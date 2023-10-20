import { SubsidySearch } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { mockSubsidies } from '@/mocks/api/subsidy/mockData'

const meta: Meta<typeof SubsidySearch> = {
  title: 'templates/SubsidySearch',
  component: SubsidySearch,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SubsidySearch>

const Template: Story = {
  args: {
    subsidies: mockSubsidies,
  },
}

export const Default: Story = {
  ...Template,
}

export const FetchedError: Story = {
  ...Template,
  args: {
    subsidies: [],
  },
}
