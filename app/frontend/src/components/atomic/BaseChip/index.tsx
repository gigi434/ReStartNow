import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material'
import React from 'react'

export interface BaseChipProps extends MuiChipProps {}

export function BaseChip({
  label,
  variant = 'outlined',
  size = 'medium',
  icon,
  onClick = undefined,
  onDelete = undefined,
}: BaseChipProps) {
  return (
    <MuiChip
      label={label}
      variant={variant}
      icon={icon}
      size={size}
      onClick={onClick ? onClick : undefined}
      onDelete={onDelete ? onDelete : undefined}
    />
  )
}
