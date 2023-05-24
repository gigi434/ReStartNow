import * as React from 'react'
import MuiPagination, {
  PaginationProps as MuiPaginationProps,
} from '@mui/material/Pagination'

interface BasicPaginationProps
  extends Pick<
    MuiPaginationProps,
    'color' | 'disabled' | 'count' | 'onChange'
  > {
  color: 'primary'
}

export default function BasicPagination({
  color = 'primary',
  disabled = false,
  count,
  onChange,
}: BasicPaginationProps) {
  return (
    <MuiPagination
      count={count}
      color={color}
      disabled={disabled}
      onChange={onChange}
    />
  )
}
