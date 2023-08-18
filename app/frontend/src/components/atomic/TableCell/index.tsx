import { TableCell as MuiTableCell, TableCellProps } from '@mui/material'

export function TableCell({ align, children }: TableCellProps) {
  return <MuiTableCell align={align}>{children}</MuiTableCell>
}
