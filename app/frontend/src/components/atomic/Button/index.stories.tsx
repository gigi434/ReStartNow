import { Button } from '@/src/components'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Typography from '@mui/material/Typography'

// More on default export: https://storybook.js.org/docs/preact/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Atomic/Button',
  component: Button,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/preact/api/argtypes
  argTypes: {
    color: { control: 'select', options: ['primary'] },
    children: {
      control: 'function',
    },
    size: {
      control: 'select',
      options: ['medium', 'small', 'large'],
      default: 'medium',
    },
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
    onClick: { action: 'onClick' },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>
// More on component templates: https://storybook.js.org/docs/preact/writing-stories/introduction#using-args

// More on args: https://storybook.js.org/docs/preact/writing-stories/args
export const Primary: Story = {
  args: {
    color: 'primary',
    children: (
      <>
        <Typography>exmaple text</Typography>
      </>
    ),
    size: 'medium',
  },
}

export const Small: Story = {
  args: {
    color: 'primary',
    children: (
      <>
        <Typography>exmaple text</Typography>
      </>
    ),
    size: 'small',
  },
}
export const Large: Story = {
  args: {
    color: 'primary',
    children: (
      <>
        <Typography>exmaple text</Typography>
      </>
    ),
    size: 'large',
  },
}

export const Disabled: Story = {
  args: {
    color: 'primary',
    children: (
      <>
        <Typography>exmaple text</Typography>
      </>
    ),
    size: 'medium',
    disabled: true,
  },
}
