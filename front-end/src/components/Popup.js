import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, DialogTitle, Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import Controls from './controls';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: '0px',
  }
}));

export default function Popup(props) {
  const {
    title, children, openPopup, setOpenPopup
  } = props;
  const classes = useStyles();

  return (
    <Dialog open={openPopup} maxWidth="xl" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}

Popup.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  openPopup: PropTypes.bool,
  setOpenPopup: PropTypes.func,
};
