import React from 'react'
import { Typography, LinkText } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LinkText> = {
  title: 'Atoms/LinkText',
  component: LinkText,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
    },
  },
}

export default meta
type Story = StoryObj<typeof LinkText>

export const Default: Story = {
  args: {
    children: 'Map-It マップイット | 地図素材サイト',
    href: 'https://map-it.azurewebsites.net/',
  },
}
