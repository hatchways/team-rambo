import { Dispatch, SetStateAction } from 'react';
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  List,
  Divider,
  Drawer,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
import { useHistory } from 'react-router-dom';
import useStyles from './optionsDrawerStyles';
import { useKanban } from '../../context/';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const OptionsDrawer = ({ open, setOpen }: Props): JSX.Element => {
  const classes = useStyles();
  const { userBoards, removeBoard } = useKanban();
  const history = useHistory();

  return (
    <Drawer anchor={'right'} open={open} onClose={setOpen}>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary={<Typography className={classes.title}>Boards</Typography>}
            className={classes.primary}
          />
        </ListItem>
        <Divider />
        {userBoards.map((board) => (
          <ListItem
            key={board._id}
            button
            onClick={() => {
              history.push(`/dashboard/boards/${board._id}`);
              setOpen(false);
            }}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <SwapHorizontalCircleOutlinedIcon className={classes.icon} />
            </ListItemIcon>

            <ListItemText
              primary={<Typography className={classes.primary}>{board.name}</Typography>}
              className={classes.primary}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => {
                  removeBoard(board._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default OptionsDrawer;
