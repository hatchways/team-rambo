import { useState } from 'react';
import { cloneElement } from 'react';
import { Button, IconButton, Box, Grid, TextField, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import dialogItemStyles from './dialogItemStyles';

type ItemProps = {
  title?: string;
  content?: JSX.Element;
  icon?: JSX.Element;
};

const DialogItem = ({ title = 'blank', content = <TextField />, icon = <ClearIcon /> }: ItemProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = dialogItemStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makeElement = (element: JSX.Element, props?: any) => {
    return cloneElement(element, { ...props });
  };

  return (
    <Grid item xs={12} className={classes.mainSection}>
      {makeElement(icon, { className: classes.icons, color: 'primary' })}
      <Typography variant="h6" className={classes.dialogHeading}>
        {title}
      </Typography>
      {makeElement(content)}
      <Button
        onClick={() => {
          handleClose();
        }}
        className={classes.dialogButton}
        color="primary"
        variant="contained"
        size="large"
        disableElevation
      >
        Save
      </Button>
      <IconButton onClick={handleClose}>
        <ClearIcon color="primary" />
      </IconButton>
    </Grid>
  );
};

export default DialogItem;
