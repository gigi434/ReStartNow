import * as React from 'react'
import { Typography } from '@mui/material'
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material'
import { Stack } from '@mui/material'

export interface ValidationResultTextProps {
  /** 検証不合格時に表示する文字列 */
  message: string
  isPassed: boolean
}

/** 入力された値の検証結果を表示するテキスト */
export function ValidationResultText({
  message,
  isPassed,
}: ValidationResultTextProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {isPassed ? (
        <CheckCircleIcon color="success" />
      ) : (
        <CancelIcon color="error" />
      )}
      <Typography
        variant="body2"
        style={{
          color: isPassed ? 'green' : 'red',
        }}
      >
        {message}
      </Typography>
    </Stack>
  )
}
