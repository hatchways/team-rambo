import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './AddColumnDialogStyles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

const AddColumnDialog = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={4} className={classes.buttonZone}>
      <Grid item>
        <Button className={classes.button} onClick={handleClickOpen} startIcon={<AddOutlinedIcon />}></Button>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" aria-labelledby="form-dialog-column-title">
        <DialogTitle id="form-dialog-title">Create a new column</DialogTitle>
        <DialogContent>
          <TextField required label="Add Title" variant="outlined" />
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button
            onClick={handleClose}
            className={classes.dialogButton}
            color="primary"
            variant="contained"
            disableElevation
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AddColumnDialog;
