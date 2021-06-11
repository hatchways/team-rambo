import React from 'react';
import { Button, IconButton, Grid, Dialog, Typography, DialogTitle, Divider, DialogContent } from '@material-ui/core';
import { Clear } from '@material-ui/icons/';
import styledDialogStyles from './styledDialogStyles';

type Props = {
  open: boolean;
  buttonText: string;
  title: string;
  toggleFunction: React.Dispatch<React.SetStateAction<boolean>>;
  buttonFunction?: () => void;
  component: JSX.Element;
};

const StyledDialog = ({ open, buttonText, title, toggleFunction, buttonFunction, component }: Props): JSX.Element => {
  const classes = styledDialogStyles();

  const handleClose = () => {
    toggleFunction(false);
  };

  const handleSubmit = () => {
    buttonFunction && buttonFunction();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle disableTypography className={classes.root}>
          <Typography variant="h6" className={classes.dialogTitle}>
            {title}
          </Typography>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <Clear />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          <Grid container direction="column" alignItems="center" spacing={4}>
            <Grid item className={classes.component}>
              {component}
            </Grid>
            <Grid item>
              <Button
                type="submit"
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                size="large"
                disableElevation
              >
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StyledDialog;
