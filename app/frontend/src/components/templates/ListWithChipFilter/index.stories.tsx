import { ListWithChipFilter } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ListWithChipFilter> = {
  title: 'templates/ListWithChipFilter',
  component: ListWithChipFilter,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ListWithChipFilter>

const Template: Story = {}

export const Default: Story = {
  ...Template,
}
