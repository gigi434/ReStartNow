import { Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'

type ProgressBar = {
  /** 進行状況 */
  progress: number
}

export function ProgressBar({ progress }: ProgressBar) {
  return (
    <Box>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" color="text.secondary">
        {`${Math.round(progress)}%`}
      </Typography>
    </Box>
  )
}
