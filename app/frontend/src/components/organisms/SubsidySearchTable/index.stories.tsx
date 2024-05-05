import { SubsidySearchTable } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { mockSubsidies } from '@/mocks/api/subsidy/mockData'

const meta: Meta<typeof SubsidySearchTable> = {
  title: 'organisms/SubsidySearchTable',
  component: SubsidySearchTable,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SubsidySearchTable>

const Template: Story = {}
export const Default: Story = {
  ...Template,
  args: {
    subsidies: mockSubsidies,
  },
}
