import { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  Box,
  Grid,
  Dialog,
  Typography,
  DialogActions,
  Divider,
  DialogContent,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import DatePicker from '../DatePicker/DatePicker';
import { IColumn } from '../../interface/';
import DialogItemGroup from './DialogItemGroup/DialogItemGroup';
import cardDialogStyles from './cardDialogStyles';
import useColorTagStyles from '../Kanban/shared/colorStyles';
import { useSnackBar, useDialog, useKanban } from '../../context/';

interface DialogProps {
  name: string;
  tag: string;
  columnId: string;
  id: string;
}

const CardDialog = ({ name = 'blank', columnId, tag = 'white', id }: DialogProps): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [column, setColumn] = useState<IColumn | null>(null);
  const classes = cardDialogStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const colorClasses = useColorTagStyles({ tag });
  const { addCard, resetOpenCard, getColumnById } = useKanban();
  const { items, addItem, resetItems } = useDialog();

  const handleClose = () => {
    resetOpenCard();
    setOpen(false);
    resetItems();
  };

  useEffect(() => {
    const column = getColumnById(columnId);
    if (!column) {
      updateSnackBarMessage('Column does not exist');
      handleClose();
    }
    setColumn(column);

    return () => setColumn(null);
  }, []);

  return (
    <Box>
      <Dialog scroll="paper" open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <Grid container spacing={3} className={classes.hasMargin}>
          <Grid item xs={12}>
            <Grid container className={classes.titleContainer}>
              <ImportContactsOutlinedIcon color="primary" className={classes.icons} />
              <Typography variant="h5" className={classes.dialogTitle}>
                {name}
              </Typography>
              <Box className={`${classes.cardTag} ${colorClasses.cardTagColor}`}></Box>
            </Grid>
            <Typography variant="body2" className={classes.dialogSubTitle}>
              {`In list "${column?.name}"`}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container className={classes.hasMargin}>
          <Grid container>
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
                    _id: id,
                    name,
                    columnId,
                    tag,
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
              <DatePicker />
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
                    _id: id,
                    name,
                    columnId,
                    tag,
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
          <Grid container direction="column" className={classes.buttonContainer}>
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
        <DialogContent dividers={false}>
          <Grid container xs={12} className={classes.hasMargin}>
            <DialogItemGroup items={items} />
            <Grid container xs={2} direction="column" className={classes.buttonContainer}>
              <Grid item>
                <Box className={classes.buttonGroup}>
                  <Typography variant="caption" className={classes.buttonColumnTitle}>
                    ADD TO CARD:
                  </Typography>
                  <Button className={classes.columnButton}>Tag</Button>
                  <Button className={classes.columnButton}>Check-list</Button>
                  <Button
                    className={classes.columnButton}
                    onClick={() => {
                      addItem({
                        title: 'Deadline:',
                        content: 'deadline',
                        icon: 'schedule',
                        id: `item-${Math.floor(Math.random() * 999999)}`,
                      });
                    }}
                  >
                    Deadline
                  </Button>
                  <Button className={classes.columnButton}>Attachment</Button>
                  <Button
                    className={classes.columnButton}
                    onClick={() => {
                      addItem({
                        title: 'Description:',
                        content: 'description',
                        icon: 'contacts',
                        id: `item-${Math.floor(Math.random() * 999999)}`,
                      });
                    }}
                  >
                    Cover
                  </Button>
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
        </DialogContent>
        <DialogActions>
          <IconButton className={classes.topRight} onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CardDialog;
