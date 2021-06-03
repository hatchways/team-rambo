import { useState } from 'react';
import { Button, TextField, Grid, Box } from '@material-ui/core';
import addColumnDialogStyles from './AddColumnDialogStyles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import StyledDialog from '../StyledDialog/StyledDialog';

const AddColumnDialog = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = addColumnDialogStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box className={classes.outerContainer}>
      <Grid container direction="row" alignItems="stretch" justify="space-between">
        <Grid item xs={1} className={classes.buttonZone}>
          <Button className={classes.button} onClick={handleClickOpen}>
            {<AddCircleOutlineOutlinedIcon fontSize="large" />}
          </Button>
        </Grid>
        <Grid item xs={1} className={classes.buttonZone}>
          <Button className={classes.button} onClick={handleClickOpen}>
            {<AddCircleOutlineOutlinedIcon fontSize="large" />}
          </Button>
        </Grid>
      </Grid>
      <StyledDialog
        open={open}
        buttonText="Create"
        title="Create a new column"
        toggleFunction={setOpen}
        component={
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
        }
      />
    </Box>
  );
};

export default AddColumnDialog;
