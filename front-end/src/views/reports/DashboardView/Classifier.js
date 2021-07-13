import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ViewListIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const Classifier = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              КЛАССИФИКАТОР СТРОИТЕЛЬНЫХ РЕСУРСОВ
            </Typography>
            <Typography color="textPrimary" variant="h3">
              1,600 позиций
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ViewListIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
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

Classifier.propTypes = {
  className: PropTypes.string
};

export default Classifier;
