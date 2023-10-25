import { mockMunicipalities } from '@/mocks/api/municipalities/mockData'
import { mockPrefetures } from '@/mocks/api/prefectures/mockData'
import { RegionSearch } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RegionSearch> = {
  title: 'templates/RegionSearch',
  component: RegionSearch,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RegionSearch>

const Template: Story = {
  args: {
    municipalities: mockMunicipalities,
    prefectures: mockPrefetures,
  },
}

export const Default: Story = {
  ...Template,
}
