import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

export default function useTable(records, headCells, filterFn) {
  const pages = [25, 50, 100];
  const [page, setPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const classes = useStyles();

  const TblContainer = ({ children }) => (
    <Table className={classes.table}>
      {children}
    </Table>
  );

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  };

  const TblHead = () => (
    <TableHead>
      <TableRow>
        {
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {
                headCell.disableSorting ? headCell.label
                  : (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleSortRequest(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )
              }
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  );

  const handleChangePage = (event, newPage) => {
    setPages(newPage);
  };

  const handleChangePagePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPages(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      labelRowsPerPage="Записей на станице"
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangePagePerPage}
    />
  );

  function stablesort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const orderLocal = comparator(a[0], b[0]);
      if (orderLocal !== 0) return orderLocal;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a, b, orderByLocal) {
    if (b[orderByLocal] < a[orderByLocal]) {
      return -1;
    }
    if (b[orderByLocal] > a[orderByLocal]) {
      return 1;
    }
    return 0;
  }

  function getComparator(orderLocal, orderByLocal) {
    return orderLocal === 'desc'
      ? (a, b) => descendingComparator(a, b, orderByLocal)
      : (a, b) => -descendingComparator(a, b, orderByLocal);
  }

  const recordAfterPagingAndSorting = () => {
    return stablesort(filterFn.fn(records), getComparator(order, orderBy))
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  TblContainer.propTypes = {
    children: PropTypes.node,
  };

  TblHead.protoTypes = {
    children: PropTypes.node,
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordAfterPagingAndSorting,
  };
}

useTable.propTypes = {
  records: PropTypes.array,
  headCells: PropTypes.array,
};
