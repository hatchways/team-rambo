import useStyles from './menuDrawerStyles';
import { Dispatch, SetStateAction } from 'react';
import { Typography, ListItem, ListItemText, ListItemIcon, List, Divider, Drawer } from '@material-ui/core';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

interface Props {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const MenuDrawer = ({ open, onClose }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <List className={classes.list}>
        <ListItem className={classes.avatarContainer}>
          <AvatarDisplay className={classes.avatar} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <DashboardOutlinedIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography className={classes.primary}>Dashboard</Typography>} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CalendarTodayOutlinedIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={<Typography className={classes.primary}>Calendar</Typography>} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
