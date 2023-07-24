import { TableRow as MuiTableRow, TableRowProps } from '@mui/material'

export function TableRow({ children }: TableRowProps) {
  return (
    <MuiTableRow hover role="checkbox" tabIndex={-1}>
      {children}
    </MuiTableRow>
  )
}
