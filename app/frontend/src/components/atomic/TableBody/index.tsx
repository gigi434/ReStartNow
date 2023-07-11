import { TableBody as MuiTableBody, TableBodyProps } from '@mui/material'

export function TableBody({ children }: TableBodyProps) {
  return <MuiTableBody>{children}</MuiTableBody>
}
