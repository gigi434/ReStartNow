import { mockMunicipalities } from '@/mocks/api/municipalities/mockData'
import { mockPrefetures } from '@/mocks/api/prefectures/mockData'
import { RegionSearchForm } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof RegionSearchForm> = {
  title: 'organisms/RegionSearchForm',
  component: RegionSearchForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RegionSearchForm>

export const Default: Story = {
  args: {
    municipalities: mockMunicipalities,
    prefectures: mockPrefetures
  },
}
