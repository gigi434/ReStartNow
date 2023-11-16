import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { CustomChipList } from '@/src/components'

const meta: Meta<typeof CustomChipList> = {
  title: 'organisms/CustomChipList',
  component: CustomChipList,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
}

export default meta

type Story = StoryObj<typeof CustomChipList>

const Template: Story = {
  args: {
    labels: ['development', 'operation', 'design', 'analysis', 'testing'],
  },
}

export const Default: Story = {
  ...Template,
}
