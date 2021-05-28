import { useState, MouseEvent } from 'react';
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
} from '@material-ui/core';
import cardDialogStyles from './cardDialogStyles';
import { useKanban } from '../../context/useKanbanContext';
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import DialogItemGroup from './DialogItemGroup/DialogItemGroup';
import { useDialog } from '../../context/useDetailContext';

type DialogProps = {
  name: string;
  tag: string;
  columnId: string;
  id: string;
};

const CardDialog = ({ name, columnId, tag }: DialogProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = cardDialogStyles();
  const theme = useTheme();
  const { items, addItem, resetItems, hasItem } = useDialog();
  const { columns } = useKanban();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tagColor, setTagColor] = useState(tag);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (tag: string) => {
    setAnchorEl(null);
    setTagColor(tag);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetItems();
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
      <Dialog scroll="paper" open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <Grid container spacing={3} className={classes.hasMargin}>
          <Grid item xs={12}>
            <Grid container className={classes.titleContainer}>
              <AssignmentOutlinedIcon color="primary" className={classes.icons} />
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
              {`In list "${getColNameById(columnId)}"`}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
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
