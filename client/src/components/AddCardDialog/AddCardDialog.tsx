import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  IconButton,
  Box,
  Grid,
  Dialog,
  TextField,
  Typography,
  DialogActions,
  Divider,
} from '@material-ui/core';
import addCardDialogStyles from './AddCardDialogStyles';
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

const AddCardDialog = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = addCardDialogStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button color="primary" variant="contained" size="large" onClick={handleClickOpen} disableElevation>
        Add a card
      </Button>
      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.dialogTitle}>
              <AssignmentOutlinedIcon />
              Midterm Exam
            </Typography>
          </Grid>
          <Divider className={classes.divider} />
          <Grid item xs={10}>
            <Typography variant="h5" className={classes.dialogTitle}>
              Description:
            </Typography>
            <TextField fullWidth placeholder="Add description" variant="outlined" className={classes.textField} />
            <Button
              onClick={handleClose}
              className={classes.dialogButton}
              color="primary"
              variant="contained"
              size="large"
              disableElevation
            >
              Save
            </Button>
            <Typography variant="h5" className={classes.dialogTitle}>
              Deadline:
            </Typography>
            <Typography variant="h5" className={classes.dialogTitle}>
              Add comment:
            </Typography>
            <TextField fullWidth placeholder="Add description" variant="outlined" className={classes.textField} />
            <Button
              onClick={handleClose}
              className={classes.dialogButton}
              color="primary"
              variant="contained"
              size="large"
              disableElevation
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={2}>
            <ButtonGroup
              disableElevation
              orientation="vertical"
              color="primary"
              variant="contained"
              className={classes.buttonGroup}
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
              <Button>Four</Button>
              <Button>Five</Button>
            </ButtonGroup>
            <ButtonGroup
              disableElevation
              orientation="vertical"
              color="primary"
              variant="contained"
              className={classes.buttonGroup}
            >
              <Button>Six</Button>
              <Button>Seven</Button>
              <Button>Eight</Button>
              <Button>Nine</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <DialogActions>
          <IconButton className={classes.topRight} onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddCardDialog;
