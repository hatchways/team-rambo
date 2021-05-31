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
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SettingsIcon from '@material-ui/icons/Settings';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import useColorTagStyles from '../Kanban/shared/colorStyles';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useKanban } from '../../context/useKanbanContext';
import { useDialog } from '../../context/useDialogContext';
import { IColumn } from '../../interface/Column';
import { cardDialogStyles, DialogItemGroup } from '../CardDialog';

type DialogProps = {
  name: string;
  tag: string;
  columnId: string;
  id: string;
};

const CardDialog = ({ name, columnId, tag }: DialogProps): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [column, setColumn] = useState<IColumn | null>(null);
  const classes = cardDialogStyles();
  const theme = useTheme();
  const { updateSnackBarMessage } = useSnackBar();
  const colorClasses = useColorTagStyles({ tag });
  const { resetOpenCard, getColumnById } = useKanban();
  const { items, addItem, resetItems, hasItem } = useDialog();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tagColor, setTagColor] = useState(tag);

  const handleClose = () => {
    resetOpenCard();
    setOpen(false);
    resetItems();
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (tag: string) => {
    setAnchorEl(null);
    setTagColor(tag);
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
              <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
        <DialogContent dividers={false}>
          <Grid container className={classes.hasMargin}>
            <Grid item xs={10}>
              <DialogItemGroup items={items} />
            </Grid>
            <Grid item xs={2} direction="column" className={classes.buttonContainer}>
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
                <Button
                  className={hasItem('checklist') ? classes.columnButtonActive : classes.columnButton}
                  onClick={() => {
                    addItem({
                      title: 'Checklist:',
                      content: 'checklist',
                      icon: 'checklist',
                      id: `item-${Math.floor(Math.random() * 999999)}`,
                    });
                  }}
                >
                  Check-list
                </Button>
              </Box>
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
