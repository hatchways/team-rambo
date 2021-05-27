import { useState } from 'react';
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
} from '@material-ui/core';
import cardDialogStyles from './cardDialogStyles';
import useColorTagStyles from '../Kanban/shared/colorStyles';
import { useKanban } from '../../context/useKanbanContext';
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import DialogItemGroup from './DialogItemGroup/DialogItemGroup';
import { useDialog } from '../../context/useDetailContext';

type DialogProps = {
  name: string;
  tag: string;
  columnId: string;
  id: string;
};

const CardDialog = ({ name = 'blank', columnId, tag = 'white', id }: DialogProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const classes = cardDialogStyles();
  const colorClasses = useColorTagStyles({ tag });
  const { items, addItem, resetItems } = useDialog();
  const { columns } = useKanban();

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
              <Box className={`${classes.cardTag} ${colorClasses.cardTagColor}`}></Box>
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
