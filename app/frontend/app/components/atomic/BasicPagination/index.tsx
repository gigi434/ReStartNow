import * as React from 'react'
import MuiPagination, {
  PaginationProps as MuiPaginationProps,
} from '@mui/material/Pagination'

interface BasicPaginationProps
  extends Pick<
    MuiPaginationProps,
    'color' | 'disabled' | 'count' | 'onChange' | 'page' | 'variant'
  > {}

export function BasicPagination({
  color = 'primary',
  disabled = false,
  count,
  onChange,
  page,
  variant,
}: BasicPaginationProps) {
  return (
    <MuiPagination
      count={count}
      color={color}
      disabled={disabled}
      onChange={onChange}
      page={page}
      variant={variant}
    />
  )
}
