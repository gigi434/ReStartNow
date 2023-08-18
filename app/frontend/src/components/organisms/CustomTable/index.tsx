import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import { useTheme } from '@mui/material'
import { ClientSideSubsidy } from '@/src/types'
import { Prisma } from '@prisma/client'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/store'
import Link from 'next/link'
import { Link as MuiLink } from '@mui/material'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | Prisma.JsonValue },
  b: { [key in Key]: number | string | Prisma.JsonValue }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof ClientSideSubsidy
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: '助成金',
  },
  {
    id: 'ageLimit',
    numeric: true,
    disablePadding: false,
    label: '最大受給年齢',
  },
  {
    id: 'applicationAddress',
    numeric: false,
    disablePadding: false,
    label: '申請先',
  },
  {
    id: 'applicationMethod',
    numeric: false,
    disablePadding: false,
    label: '申請方法',
  },
  {
    id: 'applicationRequirements',
    numeric: false,
    disablePadding: false,
    label: '申請資格',
  },
  {
    id: 'amountReceived',
    numeric: false,
    disablePadding: false,
    label: '受給額',
  },
  {
    id: 'deadlineForReceipt',
    numeric: false,
    disablePadding: false,
    label: '受付締切日',
  },
]

interface EnhancedTableProps {
  onRequestSort: (property: keyof ClientSideSubsidy) => void
  order: Order
  orderBy: string
}

/** 助成金検索フォームにより検索する値を含んだ助成金レコードを表示するためのコールバック関数 */
function filterSubsidies(
  subsidies: ClientSideSubsidy[],
  filters: RootState['subsidySearch']
) {
  return subsidies.filter((subsidy) =>
    Object.entries(filters).every(
      ([key, value]) =>
        !value || String(subsidy[key as keyof ClientSideSubsidy]) === value
    )
  )
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const theme = useTheme()
  const { onRequestSort, order, orderBy } = props
  const createSortHandler = (property: keyof ClientSideSubsidy) => () => {
    onRequestSort(property)
  }

  return (
    <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export function CustomTable({ Subsidies }: { Subsidies: ClientSideSubsidy[] }) {
  const subsidySearch = useSelector((state: RootState) => state.subsidySearch)
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof ClientSideSubsidy>('name')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (property: keyof ClientSideSubsidy) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredSubsidies = filterSubsidies(Subsidies, subsidySearch)

  const visibleRows = React.useMemo(
    () =>
      stableSort<ClientSideSubsidy>(
        filteredSubsidies,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredSubsidies]
  )

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, Subsidies.length - page * rowsPerPage)

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <Link
                    href={`/subsidies/${row.id}/question`}
                    passHref
                    key={row.id}
                    legacyBehavior
                  >
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        <MuiLink underline="none" color="inherit">
                          {row.name}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="right">
                        <MuiLink underline="none" color="inherit">
                          {row.ageLimit}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="right">
                        <MuiLink underline="none" color="inherit">
                          {row.applicationAddress}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="right">
                        <MuiLink underline="none" color="inherit">
                          {row.applicationMethod}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="right">
                        <MuiLink underline="none" color="inherit">
                          {row.applicationRequirements}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="right">
                        <MuiLink underline="none" color="inherit">
                          {row.amountReceived}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="right">
                        <MuiLink underline="none" color="inherit">
                          {row.deadlineForReceipt}
                        </MuiLink>
                      </TableCell>
                    </TableRow>
                  </Link>
                )
              })}
              {rowsPerPage > 0 && emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Subsidies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
