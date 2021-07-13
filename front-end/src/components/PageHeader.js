import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Card, Typography, makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fdfdff'
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#3c44b1'
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6'
    }
  }
}));

export default function PageHeader(props) {
  const classes = useStyles();
  const { title, subTitle, icon } = props;
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>
          {icon}
        </Card>
        <div className={classes.pageTitle}>
          <Typography
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
          >
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  icon: PropTypes.object,
};
