import { AreYouSureDialog } from '../../index'
import type { Meta, StoryObj } from '@storybook/react'
const meta: Meta<typeof AreYouSureDialog> = {
  title: 'organisms/AreYouSureDialog',
  component: AreYouSureDialog,
  tags: ['autodocs'],
  argTypes: {
    open: {
      controls: 'boolean',
      defaultValue: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof AreYouSureDialog>

export const Default: Story = {
  args: {
    open: true,
    targetName: 'example text',
  },
}
