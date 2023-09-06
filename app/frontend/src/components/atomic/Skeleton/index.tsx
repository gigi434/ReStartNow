import React from 'react'
import MuiSkeleton, {
  SkeletonProps as MuiSkeletonProps,
} from '@mui/material/Skeleton'

export function Skeleton({
  variant,
  width,
  height,
  children,
}: MuiSkeletonProps) {
  return (
    <MuiSkeleton variant={variant} width={width} height={height}>
      {children}
    </MuiSkeleton>
  )
}
