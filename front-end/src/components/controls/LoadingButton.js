import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    margin: theme.spacing(0.5),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    margin: theme.spacing(0.5),
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration(props) {
  const {
    text, size, color, variant,
    success, loading, setLoading, ...other
  } = props;

  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <Button
        size={size || 'large'}
        color={color || 'primary'}
        variant={variant || 'contained'}
        className={buttonClassname}
        disabled={loading}
        // onClick={handleButtonClick}
        {...other}
      >
        Принять
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </>
  );
}

CircularIntegration.propTypes = {
  success: PropTypes.bool,
  loading: PropTypes.bool,
  // setSuccess: PropTypes.func,
  setLoading: PropTypes.func,
  text: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
};
