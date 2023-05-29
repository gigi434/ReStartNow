import * as React from 'react'
import NavigationMenu from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Molecules/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {}
