import { RegionSearch } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RegionSearch> = {
  title: 'templates/RegionSearch',
  component: RegionSearch,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RegionSearch>

const generateMunicipalities = (count: number) => {
  const municipalities = []

  for (let i = 0; i < count; i++) {
    const municipality = {
      image: `/municipality/chiba/ichikawa.jpg`,
      title: `example text${i}`,
    }

    municipalities.push(municipality)
  }

  return municipalities
}

const Template: Story = {
  args: {
    municipalities: generateMunicipalities(12),
  },
}

export const Default: Story = {
  ...Template,
}
