import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { BaseChip } from '@/src/components'

const meta: Meta<typeof BaseChip> = {
  title: 'Atoms/BaseChip',
  component: BaseChip,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
}

export default meta

type Story = StoryObj<typeof BaseChip>

const Template: Story = {
  args: {
    label: 'sample text',
  },
}

export const Default: Story = {
  ...Template,
}
