import { CustomTable } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { mockSubsidies } from '@/mocks/api/subsidy/mockData'

const meta: Meta<typeof CustomTable> = {
  title: 'organisms/CustomTable',
  component: CustomTable,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CustomTable>

const Template: Story = {}
export const Default: Story = {
  ...Template,
  args: {
    subsidies: mockSubsidies,
  },
}
