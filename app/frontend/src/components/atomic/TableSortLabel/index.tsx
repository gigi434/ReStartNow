import {
  TableSortLabel as MuiTableSortLabel,
  TableSortLabelProps,
} from '@mui/material'

export function TableSortLabel({
  active,
  direction,
  onClick,
  children,
}: TableSortLabelProps) {
  return (
    <MuiTableSortLabel active={active} direction={direction} onClick={onClick}>
      {children}
    </MuiTableSortLabel>
  )
}
