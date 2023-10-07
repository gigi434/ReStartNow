import React from 'react'
import { BaseChipProps, BaseChip } from '@/src/components'

export interface CustomChipProps extends BaseChipProps {}

export function CustomChip({
  label,
  variant,
  size,
  icon,
  onClick,
  onDelete,
}: CustomChipProps) {
  return (
    <BaseChip
      label={label}
      variant={variant}
      size={size}
      icon={icon}
      onClick={onClick}
      onDelete={onDelete}
    />
  )
}
