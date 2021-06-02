import React from 'react';
import { Button, IconButton, Dialog, Typography, DialogActions } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import styledDialogStyles from './styledDialogStyles';

type Props = {
  open: boolean;
  buttonText: string;
  title: string;
  toggleFunction: React.Dispatch<React.SetStateAction<boolean>>;
  component: JSX.Element;
};

const StyledDialog = ({ open, buttonText, title, toggleFunction, component }: Props): JSX.Element => {
  const classes = styledDialogStyles();

  const handleClose = () => {
    toggleFunction(false);
  };

  return (
    <>
      <Dialog maxWidth="sm" open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <Typography variant="h5" className={classes.dialogTitle}>
          {title}
        </Typography>
        {component}
        <Button
          type="submit"
          className={classes.dialogButton}
          color="primary"
          variant="contained"
          size="large"
          disableElevation
        >
          {buttonText}
        </Button>
        <DialogActions>
          <IconButton className={classes.topRight} onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StyledDialog;
