import { ValidationResultText } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta<typeof ValidationResultText> = {
  title: 'Molecules/ValidationResultText',
  component: ValidationResultText,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
}

export default meta

type Story = StoryObj<typeof ValidationResultText>

const Template: Story = {
  args: {
    isPassed: true,
    message: '英字の小文字を含める必要があります',
  },
}

export const Success: Story = {
  ...Template,
  name: '検証が合格した場合',
}

export const Error: Story = {
  ...Template,
  name: '検証が不合格した場合',
  args: {
    ...Template.args, // Templateのargsを継承することで、testとmessageがundefinedになるのを防ぎます
    isPassed: false,
  },
}
