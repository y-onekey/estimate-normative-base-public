import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

function Notification(props) {
  const { notify, setNotify } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log('setNotify in Notification commented');
    console.log('setNotify', setNotify);
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      TransitionComponent={TransitionLeft}
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

Notification.propTypes = {
  notify: PropTypes.object,
  setNotify: PropTypes.func,
};

export default Notification;
