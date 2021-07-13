import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function PositionTable({ view, positions }) {
  const classes = useStyles();

  if (positions.length < 1) {
    return <Typography>Нет содержимого</Typography>;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Код ресурса</TableCell>
            <TableCell align="center">Наименование</TableCell>
            <TableCell align="center">Ед. измерения</TableCell>
            <TableCell align="center">{' '}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.code}>
              <TableCell component="th" scope="row">
                {position.full_code}
              </TableCell>
              <TableCell align="center">{position.title_ru}</TableCell>
              <TableCell align="center">{position.unit}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  // monitoring/material/01.1.01.01.0001
                  href={`monitoring/${view}/${position.id}`}
                >
                  Мониторить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PositionTable.propTypes = {
  positions: PropTypes.array,
  view: PropTypes.string,
};
