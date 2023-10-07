import React from 'react'
import MuiSnackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertColor } from '@mui/material/Alert'

/** Snackbar コンポーネントに渡す props の型情報 */
type SnackbarProps = {
  /** スナックバーを表示するか */
  open: boolean

  /** スナックバーに表示するメッセージ */
  message: string

  /** イベントの重大度 (error | warning | info | success) */
  severity?: AlertColor

  /** スナックバーを閉じる際に呼ばれるコールバック関数 */
  onClose?: () => void
}

/** スナックバーを表示するコンポーネント */
export function Snackbar({
  open,
  message,
  severity = 'info',
  onClose,
}: SnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      onClose={onClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <MuiAlert variant="standard" severity={severity}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  )
}
