import { SubsidySearchForm } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { mockSubsidies } from '@/mocks/api/subsidy/mockData'

const meta: Meta<typeof SubsidySearchForm> = {
  title: 'organisms/SubsidySearchForm',
  component: SubsidySearchForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SubsidySearchForm>

export const Default: Story = {
  args: {
    subsidies: mockSubsidies,
  },
}
