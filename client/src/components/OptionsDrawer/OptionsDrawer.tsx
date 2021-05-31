import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
import useStyles from './optionsDrawerStyles';
import { IBoard } from '../../interface/Board';

interface Props {
  open: boolean;
  boards: Array<IBoard>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsDrawer = ({ open, boards, setOpen }: Props): JSX.Element => {
  const classes = useStyles();

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
        {boards.map((board) => (
          <ListItem key={board.id} button>
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
