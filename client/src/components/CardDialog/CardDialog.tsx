import { useState, useEffect, MouseEvent } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
  Dialog,
  Typography,
  DialogActions,
  Divider,
  DialogContent,
  useTheme,
  TextField,
} from '@material-ui/core';
import cardDialogStyles from './cardDialogStyles';
import { useKanban } from '../../context/useKanbanContext';
import ClearIcon from '@material-ui/icons/Clear';
import SettingsIcon from '@material-ui/icons/Settings';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DatePicker from '../DatePicker/DatePicker';
import { IColumn } from '../../interface/Column';
import { useSnackBar } from '../../context/useSnackbarContext';
import DialogItemGroup from './DialogItemGroup/DialogItemGroup';
import { useDialog } from '../../context/useDetailContext';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';

type DialogProps = {
  name: string;
  tag: string;
  columnId: string;
  id: string;
};

const CardDialog = ({ name, columnId, tag, id }: DialogProps): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [column, setColumn] = useState<IColumn | null>(null);
  const classes = cardDialogStyles();
  const theme = useTheme();
  const { updateSnackBarMessage } = useSnackBar();
  const { addCard, resetOpenCard, getColumnById } = useKanban();
  const { items, addItem, resetItems, hasItem } = useDialog();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tagColor, setTagColor] = useState(tag);

  const handleClose = () => {
    resetOpenCard();
    setOpen(false);
    resetItems();
  };

  const handleMenuClose = (tag: string) => {
    setAnchorEl(null);
    setTagColor(tag);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const column = getColumnById(columnId);
    if (!column) {
      updateSnackBarMessage('Column does not exist anymore');
      handleClose();
    }
    setColumn(column);
    return () => {
      setColumn(null);
    };
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
              <Box className={`${classes.cardTag}`} style={{ backgroundColor: theme.palette.tags[tagColor] }}></Box>
              <IconButton onClick={handleClick}>
                <SettingsIcon className={classes.icons} />
              </IconButton>
              <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {Object.keys(theme.palette.tags).map((tag: string): JSX.Element => {
                  return (
                    <MenuItem onClick={() => handleMenuClose(tag)} key={`${columnId}-${tag}`}>
                      <Box
                        style={{ backgroundColor: theme.palette.tags[tag] }}
                        className={classes.cardTagCentered}
                      ></Box>
                    </MenuItem>
                  );
                })}
              </Menu>
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
                    name,
                    columnId: columnId,
                    id,
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
                    name,
                    columnId: columnId,
                    id,
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
                    SECTIONS:
                  </Typography>
                  <Button
                    className={hasItem('description') ? classes.columnButtonActive : classes.columnButton}
                    onClick={() => {
                      addItem({
                        title: 'Description:',
                        content: 'description',
                        icon: 'contacts',
                        id: `item-${Math.floor(Math.random() * 999999)}`,
                      });
                    }}
                  >
                    Description
                  </Button>
                  <Button
                    className={hasItem('deadline') ? classes.columnButtonActive : classes.columnButton}
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
                  <Button
                    className={hasItem('comment') ? classes.columnButtonActive : classes.columnButton}
                    onClick={() => {
                      addItem({
                        title: 'Comment:',
                        content: 'comment',
                        icon: 'bubble',
                        id: `item-${Math.floor(Math.random() * 999999)}`,
                      });
                    }}
                  >
                    Comment
                  </Button>
                  <Button
                    className={hasItem('attachment') ? classes.columnButtonActive : classes.columnButton}
                    onClick={() => {
                      addItem({
                        title: 'Attachments:',
                        content: 'attachment',
                        icon: 'attachment',
                        id: `item-${Math.floor(Math.random() * 999999)}`,
                      });
                    }}
                  >
                    Attachment
                  </Button>
                  <Button className={classes.columnButton}>Check-list</Button>
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
