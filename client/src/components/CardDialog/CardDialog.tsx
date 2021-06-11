import { useState, MouseEvent } from 'react';
import {
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
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import { ICard } from '../../interface';
import { cardDialogStyles, DialogItemGroup, DialogActionButton, DialogMenuButton } from '../CardDialog';
import { useDialog, useKanban } from '../../context/';

interface DialogProps {
  title: string;
  tag: string;
  columnId: string;
  id: string;
  activeCard: ICard;
}

const CardDialog = ({ columnId, tag, activeCard }: DialogProps): JSX.Element => {
  const [open, setOpen] = useState(true);
  const classes = cardDialogStyles();
  const theme = useTheme();
  const { resetOpenCard, getColumnById, updateActiveCard } = useKanban();
  const { resetItems } = useDialog();
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
    if (typeof tag === 'string') {
      setTagColor(tag);
      updateActiveCard({ tag: tag });
    }
  };

  return (
    <>
      <Dialog scroll="paper" open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
        <Grid container spacing={3} className={classes.hasMargin}>
          <Grid item xs={12}>
            <Grid container className={classes.titleContainer}>
              <ImportContactsOutlinedIcon color="primary" className={classes.icons} />
              <Typography variant="h5" className={classes.dialogTitle}>
                {activeCard.title}
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
              {`In list "${getColumnById(columnId)?.name}"`}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <DialogContent dividers={false}>
          <Grid container className={classes.hasMargin}>
            <Grid item xs={10}>
              <DialogItemGroup activeCard={activeCard} />
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="column" className={classes.buttonContainer}>
                <Grid item>
                  <Box className={classes.buttonGroup}>
                    <Typography variant="caption" className={classes.buttonColumnTitle}>
                      SECTIONS:
                    </Typography>
                    <DialogActionButton title="Description" content="description" icon="contacts" />
                    <DialogActionButton title="Deadline" content="date" icon="schedule" />
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
                    <DialogMenuButton name="Move" />
                    <DialogMenuButton name="Copy" />
                    <DialogMenuButton name="Share" />
                    <DialogMenuButton name="Delete" />
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
