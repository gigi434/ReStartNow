import CloseButton from './index'
import type { Meta, StoryObj } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/preact/writing-stories/introduction#default-export
const meta: Meta<typeof CloseButton> = {
  title: 'Atomic/Button/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/preact/api/argtypes
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'small', 'large'],
      default: 'medium',
    },
    onClick: { action: 'onClick' },
  },
}

export default meta
type Story = StoryObj<typeof CloseButton>
// More on component templates: https://storybook.js.org/docs/preact/writing-stories/introduction#using-args

// More on args: https://storybook.js.org/docs/preact/writing-stories/args

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
  },
}
export const Small: Story = {
  args: {
    size: 'small',
  },
}
