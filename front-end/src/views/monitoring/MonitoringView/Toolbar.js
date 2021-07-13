import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="center"

      >
        <Typography variant="h1" component="h2">
          Мониторинг строительных ресурсов
        </Typography>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
