import { Dispatch, SetStateAction } from 'react';
import { Typography, ListItem, ListItemText, ListItemIcon, List, Divider, Drawer } from '@material-ui/core';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
import useStyles from './optionsDrawerStyles';
import { useKanban } from '../../context/';
import { useHistory } from 'react-router-dom';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const OptionsDrawer = ({ open, setOpen }: Props): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { userBoards } = useKanban();

  return (
    <Drawer anchor={'right'} open={open} onClose={setOpen}>
      <List className={classes.list}>
        <ListItem>
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
              history.push(`/dashboard/board/${board._id}`);
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <SwapHorizontalCircleOutlinedIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography className={classes.primary}>{board.name}</Typography>}
              className={classes.primary}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default OptionsDrawer;
