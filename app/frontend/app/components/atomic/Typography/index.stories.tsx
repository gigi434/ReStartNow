import Typography from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Typography> = {
  title: 'Atomic/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'inherit',
      ],
    },
    content: {
      control: 'text',
      defaultValue: 'example',
    },
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const H1: Story = {
  args: {
    variant: 'h1',
    content: 'example text',
  },
}
export const H2: Story = {
  args: {
    variant: 'h2',
    content: 'example text',
  },
}
export const H3: Story = {
  args: {
    variant: 'h3',
    content: 'example text',
  },
}
export const H4: Story = {
  args: {
    variant: 'h4',
    content: 'example text',
  },
}
export const H5: Story = {
  args: {
    variant: 'h5',
    content: 'example text',
  },
}
export const H6: Story = {
  args: {
    variant: 'h6',
    content: 'example text',
  },
}
export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    content: 'example text',
  },
}
export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    content: 'example text',
  },
}
export const Body1: Story = {
  args: {
    variant: 'body1',
    content: 'example text',
  },
}
export const Body2: Story = {
  args: {
    variant: 'body2',
    content: 'example text',
  },
}
