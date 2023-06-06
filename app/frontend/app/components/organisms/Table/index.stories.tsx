import { EnhancedTable } from '../../index'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof EnhancedTable> = {
  title: 'organisms/EnhancedTable',
  component: EnhancedTable,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof EnhancedTable>

export const Default: Story = {}
