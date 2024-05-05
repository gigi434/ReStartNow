import React from 'react'
import { Provider } from 'react-redux'
import { Snackbars } from '@/src/components'
import type { Meta, StoryObj } from '@storybook/react'
import { RootState, setupStore } from '@/src/store'

const mockedInitialState: Partial<RootState> = {
  notifications: [
    {
      id: 1,
      message: 'Example Notification1',
      severity: 'info',
      open: true,
    },
  ],
}

const meta: Meta<typeof Snackbars> = {
  title: 'Molecules/Snackbars',
  component: Snackbars,
  tags: ['autodocs'],
  decorators: [
    (story) => (
      <Provider store={setupStore(mockedInitialState)}>{story()}</Provider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Snackbars>

export const Default: Story = {}
