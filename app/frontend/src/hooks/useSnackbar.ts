// スナックバーを表示させるカスタムフック
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/src/store'
import { show, hide } from '@/src/slice/snackbarSlice'
import React from 'react'

export const useSnackbar = () => {
  const dispatch = useDispatch()
  const snackbar = useSelector((state: RootState) => state.snackbar)

  /** スナックバーを表示するコールバック関数 */
  const openSnackbar = (message: string) => {
    dispatch(show(message))
  }
  /** スナックバーを非表示にするコールバック関数 */
  const closeSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(hide())
  }

  return { snackbar, openSnackbar, closeSnackbar }
}
