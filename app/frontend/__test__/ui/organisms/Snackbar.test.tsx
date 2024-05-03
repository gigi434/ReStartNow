import { waitForElementToBeRemoved, screen } from '@testing-library/react'
import { Snackbars } from '@/src/components'
import React from 'react'
import { userEvent } from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { useSnackbar } from '@/src/hooks/useSnackbar'
import { NotificationMessage } from '@/src/slice'
import { renderWithProviders, renderHookWithProviders } from '@/src/utils'

describe('organisms/Snackbars', () => {
  const mockDto: NotificationMessage = {
    id: 1,
    message: 'test message',
    severity: 'info',
    open: true,
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers())
    jest.useRealTimers()
  })

  it('should be visible during 6000ms', async () => {
    const { store } = renderWithProviders(<Snackbars />)
    const { result } = renderHookWithProviders(() => useSnackbar(), { store })

    // スナックバーを表示してデフォルトの6秒間表示されていることを確認する
    act(() => result.current.showSnackbar(mockDto))
    act(() => jest.advanceTimersByTime(5000))
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it("shouldn't be visible after 6000ms", async () => {
    const { store } = renderWithProviders(<Snackbars />)
    const { result } = renderHookWithProviders(() => useSnackbar(), { store })

    // デフォルトで6秒表示されるため、7秒待つ
    act(() => result.current.showSnackbar(mockDto))
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'), {
      timeout: 7000,
    })

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should close when close icon is clicked', async () => {
    const { store } = renderWithProviders(<Snackbars />)
    const { result } = renderHookWithProviders(() => useSnackbar(), { store })

    act(() => result.current.showSnackbar(mockDto))
    expect(screen.getByRole('alert')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button'))

    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
