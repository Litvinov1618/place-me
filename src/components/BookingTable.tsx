import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 360,
  },
})

interface BookingTableProps {
  rows: {
    userName: string
    dateRange: string
    visitors: number
  }[]
}

const BookingTable: React.FC<BookingTableProps> = ({ rows }) => {
  const { root } = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={root} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="center">Period</TableCell>
            <TableCell align="center">Visitors</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.userName}>
              <TableCell component="th" scope="row">
                {row.userName}
              </TableCell>
              <TableCell align="center">{row.dateRange}</TableCell>
              <TableCell align="center">{row.visitors}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BookingTable
