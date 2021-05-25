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
import useColorTagStyles from '../Kanban/shared/colorStyles';
import { useKanban } from '../../context/useKanbanContext';
import ClearIcon from '@material-ui/icons/Clear';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

type DialogProps = {
  name: string;
  tag: string;
  columnId: string;
  id: string;
};

const AddCardDialog = ({ name = 'blank', columnId, tag = 'white', id }: DialogProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = addCardDialogStyles();
  const colorClasses = useColorTagStyles({ tag });
  const { addCard, columns } = useKanban();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getColNameById = (columnId: string): string => {
    const matchingColumns = columns.filter((col) => col.id === columnId);
    return matchingColumns[0].name;
  };

  return (
    <Box>
      <Button color="primary" variant="contained" size="large" onClick={handleClickOpen} disableElevation>
        Add a card
      </Button>
      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <Grid container spacing={3} className={classes.hasMargin}>
          <Grid item xs={12}>
            <Grid container className={classes.titleContainer}>
              <AssignmentOutlinedIcon color="primary" className={classes.icons} />
              <Typography variant="h5" className={classes.dialogTitle}>
                {name}
              </Typography>
              <Box className={`${classes.cardTag} ${colorClasses.cardTagColor}`}></Box>
            </Grid>
            <Typography variant="body2" className={classes.dialogSubTitle}>
              {`In list "${getColNameById(columnId)}"`}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container xs={12} className={classes.hasMargin}>
          <Grid container xs={10}>
            <Grid item xs={12} className={classes.mainSection}>
              <ImportContactsOutlinedIcon color="primary" className={classes.icons} />
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
                onClick={() => {
                  addCard({
                    name,
                    columnId: columnId,
                    id: id,
                    tag: tag,
                  });
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
            <Grid item xs={12} className={classes.mainSection}>
              <ScheduleIcon color="primary" className={classes.icons} />
              <Typography variant="h6" className={classes.dialogHeading}>
                Deadline:
              </Typography>
              <Typography variant="body1" color="primary" className={classes.date}>
                March 10
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.mainSection}>
              <ChatBubbleOutlineIcon color="primary" className={classes.icons} />
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
                onClick={() => {
                  addCard({
                    name,
                    columnId: columnId,
                    id: id,
                    tag: tag,
                  });
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
          </Grid>
          <Grid container xs={2} direction="column" className={classes.buttonContainer}>
            <Grid item>
              <Box className={classes.buttonGroup}>
                <Typography variant="caption" className={classes.buttonColumnTitle}>
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
                <Typography variant="caption" className={classes.buttonColumnTitle}>
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
