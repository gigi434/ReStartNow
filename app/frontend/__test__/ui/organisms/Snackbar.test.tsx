import {
  render,
  waitForElementToBeRemoved,
  screen,
  renderHook,
} from '@testing-library/react'
import { Snackbars } from '@/src/components'
import React from 'react'
import { userEvent } from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { store } from '@/src/store'
import { Provider } from 'react-redux'
import { useSnackbar } from '@/src/hooks/useSnackbar'
import { NotificationMessage } from '@/src/slice'

describe('organisms/Snackbars', () => {
  const mockDto: NotificationMessage = {
    id: 1,
    message: 'test message',
    severity: 'info',
    open: true,
  }

  const wrapper = ({ children }: any | undefined) => (
    <Provider store={store}>{children}</Provider>
  )
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers())
    jest.useRealTimers()
  })

  it('should be visible', () => {
    render(
      <Provider store={store}>
        <Snackbars />
      </Provider>
    )

    const { result } = renderHook(() => useSnackbar(), { wrapper })
    act(() => result.current.showSnackbar(mockDto))

    expect(screen.getByText(mockDto.message)).toBeInTheDocument()
  })

  it("shouldn't be visible after 6000ms", async () => {
    render(
      <Provider store={store}>
        <Snackbars />
      </Provider>
    )
    const { result } = renderHook(() => useSnackbar(), { wrapper })
    act(() => result.current.showSnackbar(mockDto))
    expect(screen.getByRole('alert')).toBeInTheDocument()

    // デフォルトで6秒表示されるため、7秒待つ
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'), {
      timeout: 7000,
    })

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should close when close icon is clicked', async () => {
    render(
      <Provider store={store}>
        <Snackbars />
      </Provider>
    )
    const { result } = renderHook(() => useSnackbar(), { wrapper })
    act(() => result.current.showSnackbar(mockDto))
    expect(screen.getByRole('alert')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button'))
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
