import { mockMunicipalities } from '@/mocks/api/municipalities/mockData'
import { RegionCardList } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof RegionCardList> = {
  title: 'organisms/RegionCardList',
  component: RegionCardList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RegionCardList>

export const Default: Story = {
  args: {
    municipalities: mockMunicipalities,
  },
}
