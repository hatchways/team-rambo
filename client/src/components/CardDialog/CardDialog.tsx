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
import { useSnackBar } from '../../context/useSnackbarContext';
import { useKanban } from '../../context/useKanbanContext';
import { useDialog } from '../../context/useDialogContext';
import { IColumn } from '../../interface/Column';
import {
  cardDialogStyles,
  DialogItemGroup,
  DialogActionButton,
  dialogActionButtonStyles,
  DialogMenuButton,
} from '../CardDialog';

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
  const buttonClasses = dialogActionButtonStyles(); //to be removed in Dialog Actions PR
  const theme = useTheme();
  const { updateSnackBarMessage } = useSnackBar();
  const { resetOpenCard, getColumnById, columns } = useKanban();
  const { items, resetItems } = useDialog();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [tagColor, setTagColor] = useState(tag);

  const handleClose = () => {
    resetOpenCard();
    setOpen(false);
    resetItems();
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
    updateSnackBarMessage('Choose a board to move current card to');
  };

  const handleMenuClose = (tag: string) => {
    setAnchorEl(null);
    setTagColor(tag);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
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
    <>
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
            <Grid item xs={2}>
              <Grid container direction="column" className={classes.buttonContainer}>
                <Grid item>
                  <Box className={classes.buttonGroup}>
                    <Typography variant="caption" className={classes.buttonColumnTitle}>
                      SECTIONS:
                    </Typography>
                    <DialogActionButton title="Description" content="description" icon="contacts" />
                    <DialogActionButton title="Deadline" content="deadline" icon="schedule" />
                    <DialogActionButton title="Comment" content="comment" icon="bubble" />
                    <DialogActionButton title="Attachment" content="attachment" icon="attachment" />
                    <DialogActionButton title="Checklist" content="checklist" icon="checklist" />
                  </Box>
                </Grid>
                <Grid item>
                  <Box className={classes.buttonGroup}>
                    <Typography variant="caption" className={classes.buttonColumnTitle}>
                      ACTIONS:
                    </Typography>
                    <DialogMenuButton columns={columns} name="Move" />
                    <DialogMenuButton columns={columns} name="Copy" />
                    <DialogMenuButton columns={columns} name="Share" />
                    <Button className={buttonClasses.columnButton}>Delete</Button>
                  </Box>
                </Grid>
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
    </>
  );
};

export default CardDialog;
