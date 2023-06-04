import { CustomAccordion } from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CustomAccordion> = {
  title: 'Molecules/CustomAccordion',
  component: CustomAccordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CustomAccordion>

export const Default: Story = {
  args: {
    summaryContent: 'Accordion 1',
    detailsContent: 'Detail for Accordion 1',
    id: 1,
  },
}
