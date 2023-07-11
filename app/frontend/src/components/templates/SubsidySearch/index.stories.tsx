import { SubsidySearch } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SubsidySearch> = {
  title: 'templates/SubsidySearch',
  component: SubsidySearch,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SubsidySearch>

const Template: Story = {}

export const Default: Story = {
  ...Template,
}
