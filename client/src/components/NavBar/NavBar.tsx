import { Grid, Button, Container } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import useStyles from './navBarStyles';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import AddBoardDialog from '../AddBoardDialog/AddBoardDialog';
import NotificationCenter from './Notifications/NotificationCenter/NotificationCenter';
import { testNotifications } from './Notifications/sampleNotificationData';
import logo from '../../Images/logo.png';
import { IUser } from '../../interface/';

interface Props {
  loggedInUser: IUser;
}

const NavBar = ({ loggedInUser }: Props): JSX.Element => {
  const classes = useStyles();

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
              <Button size="large" color="secondary" startIcon={<DashboardOutlinedIcon />}>
                Calendar
              </Button>
            </Grid>
            <Grid item>
              <Link to="/teams">
                <Button size="large" color="secondary" startIcon={<DashboardOutlinedIcon />}>
                  Teams
                </Button>
              </Link>
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
              <AvatarDisplay />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NavBar;
