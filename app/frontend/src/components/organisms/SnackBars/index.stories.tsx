import React from 'react'
import { Provider } from 'react-redux'
import { NotificationMessage } from '@/src/slice'
import { Snackbars } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { setupStore } from '@/src/store'

export const MockedState: NotificationMessage[] = [
  { id: 1, message: 'Example Notification1', severity: 'info', open: true },
  {
    id: 2,
    message: 'Example Notification2',
    severity: 'warning',
    open: true,
  },
]

const meta: Meta<typeof Snackbars> = {
  title: 'Molecules/Snackbars',
  component: Snackbars,
  tags: ['autodocs'],
  decorators: [(story) => <Provider store={setupStore()}>{story()}</Provider>],
}

export default meta
type Story = StoryObj<typeof Snackbars>

export const Default: Story = {}
