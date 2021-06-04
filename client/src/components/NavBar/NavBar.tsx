import { AppBar, Toolbar, Typography, IconButton, Grid, Button, Container } from '@material-ui/core/';
import useStyles from './navBarStyles';
import MenuIcon from '@material-ui/icons/Menu';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import AddBoardDialog from '../AddBoardDialog/AddBoardDialog';
import NotificationCenter from './Notifications/NotificationCenter/NotificationCenter';
import { testNotifications } from './Notifications/sampleNotificationData';
import logo from '../../Images/logo.png';
import { IUser } from '../../interface/';
import { useKanban } from '../../context';

interface Props {
  loggedInUser: IUser;
  handleDrawerToggle: () => void;
}

const NavBar = ({ loggedInUser, handleDrawerToggle }: Props): JSX.Element => {
  const classes = useStyles();
  const { activeBoard, createNewColumn } = useKanban();

  return (
    <Container className={classes.root}>
      <Grid container spacing={4} direction="row" alignItems="center" justify="center" className={classes.statusBar}>
        <Grid item xs={4}>
          <Grid container spacing={1} direction="row" alignItems="center" justify="flex-start">
            <img alt="Kanban logo" src={logo} />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={3} alignItems="center" justify="space-evenly">
            <Grid item>
              <Button size="large" color="secondary" startIcon={<CalendarTodayOutlinedIcon />}>
                Dashboard
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="large"
                color="secondary"
                onClick={() => createNewColumn('test column', 'left')}
                startIcon={<CalendarTodayOutlinedIcon />}
              >
                test card
              </Button>
            </Grid>
            <Grid item>
              <Button size="large" color="secondary" startIcon={<DashboardOutlinedIcon />}>
                Calendar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={3} alignItems="center" justify="space-evenly">
            <Grid item>
              <NotificationCenter loggedInUser={loggedInUser} notifications={testNotifications} />
            </Grid>
            <Grid item>
              <AddBoardDialog />
            </Grid>
            <Grid item>
              <AvatarDisplay loggedIn user={loggedInUser} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {activeBoard.name}
          </Typography>
          <IconButton
            onClick={handleDrawerToggle}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default NavBar;
