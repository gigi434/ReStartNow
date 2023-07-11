import { TableRow as MuiTableRow } from '@mui/material'
import { TableCell } from '@/src/components'
interface TableRowProps<T> {
  data: T
  keys: Array<keyof T>
}

export function TableRow({ data, keys }: TableRowProps<any>) {
  return (
    <MuiTableRow hover role="checkbox" tabIndex={-1}>
      {keys.map((key) => (
        <TableCell
          key={String(key)}
          align={typeof data[key] === 'number' ? 'right' : 'left'}
        >
          {data[key]}
        </TableCell>
      ))}
    </MuiTableRow>
  )
}
