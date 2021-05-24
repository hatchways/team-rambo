import { useState } from 'react';
import {
  Button,
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
          <Grid item xs={12} className={classes.titleContainer}>
            <AssignmentOutlinedIcon color="primary" className={classes.icons} />
            <Typography variant="h5" className={classes.dialogTitle}>
              Midterm Exam
            </Typography>
            <Typography variant="body2" className={classes.dialogSubTitle}>
              {'In list "Math"'}
            </Typography>
          </Grid>
          <Divider className={classes.divider} />
        </Grid>
        <Grid container xs={12} className={classes.titleContainer}>
          <Grid container xs={10}>
            <Grid item xs={12}>
              <AssignmentOutlinedIcon color="primary" className={classes.icons} />
              <Typography variant="h6" className={classes.dialogHeading}>
                Description:
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
            <Grid item xs={12}>
              <AssignmentOutlinedIcon color="primary" className={classes.icons} />
              <Typography variant="h6" className={classes.dialogHeading}>
                Deadline:
              </Typography>
              <Typography variant="body1" color="primary" className={classes.date}>
                March 10
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AssignmentOutlinedIcon color="primary" className={classes.icons} />
              <Typography variant="h6" className={classes.dialogHeading}>
                Add comment:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Add description"
                variant="outlined"
                className={classes.textField}
              />
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
          </Grid>
          <Grid container xs={2} direction="column" className={classes.buttonContainer}>
            <Grid item>
              <Box className={classes.buttonGroup}>
                <Typography variant="button" className={classes.buttonColumnTitle}>
                  ADD TO CARD:
                </Typography>
                <Button className={classes.columnButton}>Tag</Button>
                <Button className={classes.columnButton}>Check-list</Button>
                <Button className={classes.columnButton}>Deadline</Button>
                <Button className={classes.columnButton}>Attachment</Button>
                <Button className={classes.columnButton}>Cover</Button>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classes.buttonGroup}>
                <Typography variant="button" className={classes.buttonColumnTitle}>
                  ACTIONS:
                </Typography>
                <Button className={classes.columnButton}>Move</Button>
                <Button className={classes.columnButton}>Copy</Button>
                <Button className={classes.columnButton}>Share</Button>
                <Button className={classes.columnButton}>Delete</Button>
              </Box>
            </Grid>
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
