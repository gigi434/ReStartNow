import { RegionSearchForm } from '../../index'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof RegionSearchForm> = {
  title: 'organisms/RegionSearchForm',
  component: RegionSearchForm,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof RegionSearchForm>

export const Default: Story = {}
