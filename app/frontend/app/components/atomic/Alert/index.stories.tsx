import Alert from './index'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import AlertTitle from '@mui/material/AlertTitle'
import { Typography } from '@mui/material'

const meta: Meta<typeof Alert> = {
  title: 'Atomic/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
    },
    onClose: {
      description: 'aaaa',
    },
    severity: {
      control: 'select',
    },
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'outlined'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: {
    severity: 'success',
    children: (
      <>
        <AlertTitle>Success</AlertTitle>
        <Typography>test</Typography>
      </>
    ),
  },
}
export const Info: Story = {
  args: {
    severity: 'info',
    children: (
      <>
        <AlertTitle>Info</AlertTitle>
        <Typography>test</Typography>
      </>
    ),
  },
}
export const Warning: Story = {
  args: {
    severity: 'warning',
    children: (
      <>
        <AlertTitle>Warning</AlertTitle>
        <Typography>test</Typography>
      </>
    ),
  },
}
export const Error: Story = {
  args: {
    content: 'example text',
    children: (
      <>
        <AlertTitle>Error</AlertTitle>
        <Typography>test</Typography>
      </>
    ),
  },
}
export const Standard: Story = {
  args: {
    variant: 'standard',
  },
}
export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <>
        <AlertTitle>Example</AlertTitle>
        <Typography>test</Typography>
      </>
    ),
  },
}
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <AlertTitle>Example</AlertTitle>
        <Typography>test</Typography>
      </>
    ),
  },
}
