import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { CustomChip } from '@/src/components'

const meta: Meta<typeof CustomChip> = {
  title: 'molecules/CustomChip',
  component: CustomChip,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
}

export default meta

type Story = StoryObj<typeof CustomChip>

const Template: Story = {
  args: {
    label: 'sample text',
  },
}

export const Default: Story = {
  ...Template,
}

export const Clickable: Story = {
  ...Template,
  args: {
    ...Template.args,
    onClick: () => {
      console.info('You clicked the CustomChip.')
    },
  },
}

export const Deletable: Story = {
  ...Template,
  args: {
    ...Template.args,
    onDelete: () => {
      console.info('You clicked the delete icon.')
    },
  },
}
