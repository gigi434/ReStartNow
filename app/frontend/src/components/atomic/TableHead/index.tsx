import { TableHead as MuiTableHead, TableHeadProps } from '@mui/material'

export function TableHead({ children }: TableHeadProps) {
  return <MuiTableHead>{children}</MuiTableHead>
}
