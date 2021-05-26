import { useState } from 'react';
import { Button, IconButton, Box, Grid, TextField, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import dialogItemStyles from './dialogItemStyles';

type ItemProps = {
  title: string;
  content: JSX.Element;
  icon: JSX.Element;
};

const DialogItem = ({ title = 'blank', content, icon = <ImportContactsOutlinedIcon /> }: ItemProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = dialogItemStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Grid item xs={12} className={classes.mainSection}>
        <ImportContactsOutlinedIcon color="primary" className={classes.icons} />
        <Typography variant="h6" className={classes.dialogHeading}>
          {title}
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Add description"
          variant="outlined"
          className={classes.textField}
        />
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
    </Box>
  );
};

export default DialogItem;
