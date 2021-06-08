import { AppBar, Toolbar, Typography, Grid, Button, IconButton, Container, Menu, MenuItem } from '@material-ui/core/';
import { useState, MouseEvent } from 'react';
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer';
import useStyles from './navBarStyles';
import MenuIcon from '@material-ui/icons/Menu';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import AddBoardDialog from '../AddBoardDialog/AddBoardDialog';
import NotificationCenter from './Notifications/NotificationCenter/NotificationCenter';
import { notifications } from './Notifications/sampleNotificationData';
import logo from '../../Images/logo.png';
import { IUser } from '../../interface/';
import { useKanban } from '../../context';

interface Props {
  loggedInUser: IUser;
  handleDrawerToggle: () => void;
}

const NavBar = ({ loggedInUser, handleDrawerToggle }: Props): JSX.Element => {
  const classes = useStyles();
  const { activeBoard } = useKanban();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpenDrawer(true);
  };

  const handleClose = (): void => {
    setOpenDrawer(false);
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={1} direction="row" alignItems="center" justify="center" className={classes.statusBar}>
        <Grid item xs={3} sm={11} md={3} lg={3}>
          <Grid container spacing={1} direction="row" alignItems="center" justify="flex-start">
            <img alt="Kanban logo" src={logo} />
          </Grid>
        </Grid>
        <Grid item xs={9} sm={1} md={9} lg={9}>
          <Grid container spacing={2} alignItems="center" justify="flex-end">
            <Grid item className={classes.navBarButtons}>
              <Button size="large" color="secondary" startIcon={<DashboardOutlinedIcon />}>
                Dashboard
              </Button>
            </Grid>
            <Grid item className={classes.navBarButtons}>
              <Button size="large" color="secondary" startIcon={<CalendarTodayOutlinedIcon />}>
                Calendar
              </Button>
            </Grid>
            <Grid item>
              <NotificationCenter />
            </Grid>
            <Grid item className={classes.navBarButtons}>
              <AddBoardDialog />
            </Grid>
            <Grid item className={classes.navBarButtons}>
              <AvatarDisplay />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container>
            <Grid item>
              <Typography variant="h6" className={classes.title}>
                {activeBoard.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="flex-end" alignItems="center">
            <Grid item>
              <Button onClick={handleDrawerToggle} className={classes.viewBoardsButton} variant="outlined">
                View boards
              </Button>
            </Grid>
            <Grid item className={classes.menuIcon}>
              <IconButton onClick={handleOpen}>
                <MenuIcon style={{ color: 'white' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <MenuDrawer open={openDrawer} onClose={handleClose} />
    </Container>
  );
};

export default NavBar;
