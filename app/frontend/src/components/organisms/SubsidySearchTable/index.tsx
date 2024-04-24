import React from 'react'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import { useTheme } from '@mui/material'
import { Prisma } from '@prisma/client'
import Link from 'next/link'
import { Link as MuiLink } from '@mui/material'
import { CustomSubsidy } from '@/src/utils'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material'
import { useRouter } from 'next/router'

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
  a: { [key in Key]: number | string | Prisma.JsonValue | Date },
  b: { [key in Key]: number | string | Prisma.JsonValue | Date }
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
  id: keyof CustomSubsidy
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'subsidyName',
    numeric: false,
    disablePadding: false,
    label: '名前',
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
    id: 'amountReceived',
    numeric: false,
    disablePadding: false,
    label: '受給額',
  },
  {
    id: 'deadlineForReceipt',
    numeric: false,
    disablePadding: false,
    label: '申請期限',
  },
]

interface EnhancedTableProps {
  onRequestSort: (property: keyof CustomSubsidy) => void
  order: Order
  orderBy: string
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const theme = useTheme()
  const { onRequestSort, order, orderBy } = props
  const createSortHandler = (property: keyof CustomSubsidy) => () => {
    onRequestSort(property)
  }

  return (
    <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
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

export function SubsidySearchTable({
  subsidies = [],
}: {
  subsidies: CustomSubsidy[]
}) {
  const router = useRouter()
  const subsidyNameQuery = router.query.subsidyName as string
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] =
    React.useState<keyof CustomSubsidy>('subsidyName')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  if (subsidies.length === 0) {
    throw new Error('subsidies is undefined')
  }

  const handleRequestSort = (property: keyof CustomSubsidy) => {
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

  const filteredSubsidies = subsidies.filter((subsidy) =>
    subsidy.subsidyName.name
      .toLowerCase()
      .includes(subsidyNameQuery?.toLowerCase() || '')
  )

  const visibleRows = React.useMemo(
    () =>
      stableSort<CustomSubsidy>(
        filteredSubsidies,
        getComparator(order, orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredSubsidies]
  )

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, subsidies.length - page * rowsPerPage)

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
                    href={`/questions/${row.id}`}
                    passHref
                    key={row.id}
                    legacyBehavior
                  >
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.subsidyName.name}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        <MuiLink underline="none" color="inherit">
                          {row.subsidyName.name}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="left">
                        <MuiLink underline="none" color="inherit">
                          {row.applicationAddress}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="left">
                        <MuiLink underline="none" color="inherit">
                          {row.applicationMethod}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="left">
                        <MuiLink underline="none" color="inherit">
                          {row.amountReceived}
                        </MuiLink>
                      </TableCell>
                      <TableCell align="left">
                        <MuiLink
                          underline="none"
                          color="inherit"
                          suppressHydrationWarning
                        >
                          {row.deadlineForReceipt ? 'あり' : 'なし'}
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
          count={subsidies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
