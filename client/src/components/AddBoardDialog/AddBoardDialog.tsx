import { useState } from 'react';
import { Button, IconButton, Box, Grid, Dialog, TextField, Typography, DialogActions } from '@material-ui/core';
import addBoardDialogStyles from './AddBoardDialogStyles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ClearIcon from '@material-ui/icons/Clear';

const AddBoardDialog = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = addBoardDialogStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <Box>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          size="large"
          startIcon={<AddOutlinedIcon />}
          onClick={handleClickOpen}
          disableElevation
        >
          Create Board
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <Typography variant="h5" className={classes.dialogTitle}>
          Create new board
        </Typography>
        <TextField
          required
          fullWidth
          placeholder="Add Title"
          variant="outlined"
          InputProps={{
            classes: { input: classes.inputs },
          }}
          className={classes.textField}
        />
        <DialogActions>
          <IconButton className={classes.topRight} onClick={handleClose}>
            <ClearIcon />
          </IconButton>
          <Button
            onClick={handleClose}
            className={classes.dialogButton}
            color="primary"
            variant="contained"
            size="large"
            disableElevation
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddBoardDialog;
