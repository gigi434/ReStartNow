import * as React from 'react'
import { useCallback, useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  IconButton,
  Switch,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  /** ダイアログを表示するかしないか制御する論理値 */
  open: boolean
  /** 削除する対象のリソースの名前 */
  targetName: string
  /** 終了ボタンを押したときの挙動を定義するコールバック関数 */
  onClose?: (submit: boolean, targetName?: string) => void
}

/**
 * 本当に削除するのか確認するダイアログ
 */
export function AreYouSureDialog({ open, targetName, onClose }: Props) {
  const [submitAvailable, setSubmitAvailable] = useState(false)

  const handleSwitchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitAvailable(event.target.checked)
    },
    [setSubmitAvailable]
  )

  const handleClose = useCallback(
    (submit: boolean, targetName?: string) => {
      setSubmitAvailable(false)
      onClose?.(submit, targetName)
    },
    [onClose, setSubmitAvailable]
  )

  return (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        本当に削除しますか？
        <IconButton
          aria-label="close"
          onClick={() => handleClose(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography gutterBottom>
            <b>{targetName}</b>{' '}
            を削除すると、リソースに紐づくすべての情報が削除されます。
            この処理を取り消すことはできません。
          </Typography>
          <Typography gutterBottom>
            本当に削除するのであれば、スイッチをオンにしてください。
          </Typography>
        </DialogContentText>
        <Switch
          checked={submitAvailable}
          onChange={handleSwitchChange}
          color="primary"
        />
        <Button
          disabled={!submitAvailable}
          variant="contained"
          color="error"
          sx={{ width: '100%' }}
          onClick={() => handleClose(true, targetName)}
        >
          本当にこのリソースを削除します！
        </Button>
      </DialogContent>
    </Dialog>
  )
}
