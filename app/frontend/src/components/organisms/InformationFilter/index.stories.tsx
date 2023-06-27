import type { Meta, StoryObj } from '@storybook/react'
import { InformationFilter } from '@/src/components'

const meta: Meta<typeof InformationFilter> = {
  title: 'organisms/InformationFilter',
  component: InformationFilter,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InformationFilter>

const Template: Story = {
  args: {
    labels: ['development', 'operation', 'design', 'analysis', 'testing'],
  },
}

export const Default: Story = {
  ...Template,
}
