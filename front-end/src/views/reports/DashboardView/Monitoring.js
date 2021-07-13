import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  CardActions,
  Button,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const Monitoring = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              МОНИТОРИНГ СТРОИТЕЛЬНЫХ РЕСУРСОВ
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              75.5%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={75.5}
            variant="determinate"
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => console.log('basyldy')}>
          Изменить
        </Button>
        <Button size="small" color="primary">
          Просмотр
        </Button>
      </CardActions>
    </Card>
  );
};

Monitoring.propTypes = {
  className: PropTypes.string
};

export default Monitoring;
