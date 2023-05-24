import RadioButton from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RadioButton> = {
  title: 'Atomic/Button/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary'],
      default: 'primary',
    },
    size: {
      control: 'select',
      options: ['medium', 'small'],
      default: 'medium',
    },
    disabled: {
      control: 'boolean',
      default: true,
    },
    value: {
      control: 'text',
      default: 'sample-radio',
    },
    onClick: { action: 'onClick' },
  },
}

export default meta
type Story = StoryObj<typeof RadioButton>

export const Medium: Story = {
  args: {
    value: 'example-radio',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    value: 'example-radio',
  },
}
