import { useState } from 'react';
import { Button, IconButton, Box, Grid, Dialog, TextField, Typography, DialogActions } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import addColumnDialogStyles from './AddColumnDialogStyles';
import { useKanban } from '../../context/useKanbanContext';

const AddColumnDialog = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState('right');
  const [columnName, setColumnName] = useState('');
  const classes = addColumnDialogStyles();
  const { addColumn } = useKanban();

  const handleClickOpen = (addToSide: string) => {
    setSide(addToSide);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.outerContainer}>
      <Grid container direction="row" alignItems="stretch" justify="space-between">
        <Grid item xs={1} className={classes.buttonZone}>
          <Button className={classes.button} onClick={() => handleClickOpen('left')}>
            {<AddCircleOutlineOutlinedIcon fontSize="large" />}
          </Button>
        </Grid>
        <Grid item xs={1} className={classes.buttonZone}>
          <Button className={classes.button} onClick={() => handleClickOpen('right')}>
            {<AddCircleOutlineOutlinedIcon fontSize="large" />}
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <Typography variant="h5" className={classes.dialogTitle}>
          Create a new column
        </Typography>
        <TextField
          required
          fullWidth
          placeholder="Add Title"
          variant="outlined"
          onChange={(e) => setColumnName(e.target.value)}
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
            onClick={() => {
              addColumn(columnName, side);
              handleClose();
            }}
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

export default AddColumnDialog;
