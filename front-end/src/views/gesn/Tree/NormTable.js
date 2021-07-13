import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function NormTable({ norms }) {
  const classes = useStyles();
  if (norms.length < 1) {
    return <Typography>Нет содержимого</Typography>;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Код нормы</TableCell>
            <TableCell align="center">Название нормы</TableCell>
            {/* <TableCell align="center">Ед. измерения</TableCell> */}
            <TableCell align="center">{' '}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {norms.map((norm) => (
            <TableRow key={norm.code}>
              <TableCell component="th" scope="row">
                {norm.full_code}
              </TableCell>
              <TableCell align="center">{norm.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

NormTable.propTypes = {
  norms: PropTypes.array,
  // view: PropTypes.string,
};
