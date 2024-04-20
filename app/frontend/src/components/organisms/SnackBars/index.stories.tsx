import React from 'react'
import { Provider } from 'react-redux'
import { NotificationState } from '@/src/slice'
import { Snackbars } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { store } from '@/src/store'

export const MockedState: NotificationState = {
  notifications: [
    { id: 1, message: 'Example Notification1', severity: 'info', open: true },
    {
      id: 2,
      message: 'Example Notification2',
      severity: 'warning',
      open: true,
    },
  ],
}

const createMock = (state: NotificationState) => {
  return {
    ...store,
    getState: () => ({
      ...store.getState(),
      notifications: state,
    }),
  }
}

const testStore = createMock(MockedState)

const meta: Meta<typeof Snackbars> = {
  title: 'Molecules/Snackbars',
  component: Snackbars,
  tags: ['autodocs'],
  decorators: [(story) => <Provider store={testStore}>{story()}</Provider>],
}

export default meta
type Story = StoryObj<typeof Snackbars>

export const Default: Story = {}
