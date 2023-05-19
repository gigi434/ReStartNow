import React from 'react';

import SampleButton from './index';
import type { Meta, StoryObj } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/preact/writing-stories/introduction#default-export
const meta: Meta<typeof SampleButton> = {
  title: 'Example/SampleButton',
  component: SampleButton,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/preact/api/argtypes
  argTypes: {
    primary: { control: "boolean", default: false }, 
    size: { control: "select", options: ['medium', 'small', 'large'], default: "medium" },
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
};

export default meta
type Story = StoryObj<typeof SampleButton>
// More on component templates: https://storybook.js.org/docs/preact/writing-stories/introduction#using-args

// More on args: https://storybook.js.org/docs/preact/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
    size: 'medium'
  }
}

export const Secondary: Story = {
  args: {
    label: 'Button',
    size: 'medium'
  }
}

export const Large: Story = {
  args: {
    label: 'Button',
    size: 'large',
  }
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  }
}