import { IUser } from '../../interface/';
import useStyles from './useStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import logo from '../../Images/logo.png';
import AddBoardDialog from '../AddBoardDialog/AddBoardDialog';
import { IBoard } from '../../interface/Board';

interface Props {
  loggedInUser: IUser;
  handleDrawerToggle: () => void;
  onAddNewBoard: (board: IBoard) => void;
}

const NavBar = ({ loggedInUser, handleDrawerToggle, onAddNewBoard }: Props): JSX.Element => {
  const classes = useStyles();

  // Need to grab the active board from context and use it's information here instead
  // Title, anything else, etc

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
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={3} alignItems="center" justify="space-evenly">
            <Grid item>
              <AddBoardDialog onAddNewBoard={onAddNewBoard} />
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
            My School Board
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
