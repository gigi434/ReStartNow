import CustomizedAccordions from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CustomizedAccordions> = {
  title: 'Molecules/CustomizedAccordions',
  component: CustomizedAccordions,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CustomizedAccordions>

export const Default: Story = {
  args: {
    summaryContent: 'Accordion 1',
    detailsContent: 'Detail for Accordion 1',
    id: 1,
  },
}
