import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5)
  },
  label: {
    textTransform: 'none'
  }
}));

function Button(props) {
  const {
    text, size, color, variant, onClick, ...other
  } = props;

  const classes = useStyles();

  return (
    <MuiButton
      size={size || 'large'}
      color={color || 'primary'}
      variant={variant || 'contained'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
