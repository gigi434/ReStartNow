import * as React from 'react'
import MuiCircularProgress, {
  CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material/CircularProgress'

interface CircularProgressProps extends MuiCircularProgressProps {
  color?: 'primary'
}

export default function CircularProgress({ color }: CircularProgressProps) {
  return <MuiCircularProgress color={color} />
}
