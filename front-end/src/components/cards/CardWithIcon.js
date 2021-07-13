import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardActions,
  // Button,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';

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

const CardWithIcon = ({
  className,
  icon,
  title,
  subTitle,
  helpText,
  color,
  // showAction,
  buttonProp,
  ...rest
}) => {
  const classes = useStyles();

  const cl = color ? colors[color][600] : null;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {helpText}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              style={{ backgroundColor: cl }}
              className={classes.avatar}
            >
              {icon}
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {subTitle}
          </Typography>
          {/* <Typography color="textSecondary" variant="caption">
            {helpText}
          </Typography> */}
        </Box>
      </CardContent>
      <CardActions>
        {/* <Button size="small" color="primary" onClick={() => console.log('basyldy')}>
          Изменить
        </Button>
        <Button size="small" color="primary" onClick={showAction}>
          Просмотр
        </Button> */}
        {buttonProp}
      </CardActions>
    </Card>
  );
};

CardWithIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  helpText: PropTypes.string,
  color: PropTypes.string,
  // showAction: PropTypes.func,
  buttonProp: PropTypes.node,
  // key: PropTypes.number,
};

export default CardWithIcon;
