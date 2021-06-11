import { AppBar, Toolbar, Typography, Grid, Button, IconButton, Container } from '@material-ui/core/';
import { useState } from 'react';
import useStyles from './navBarStyles';
import { CalendarTodayOutlined, DashboardOutlined } from '@material-ui/icons';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import AddBoardDialog from '../AddBoardDialog/AddBoardDialog';
import NotificationCenter from './Notifications/NotificationCenter/NotificationCenter';
import logo from '../../Images/logo.png';

const NavBar = (): JSX.Element => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

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
              <Button size="large" color="secondary" startIcon={<DashboardOutlined />}>
                Dashboard
              </Button>
            </Grid>
            <Grid item className={classes.navBarButtons}>
              <Button size="large" color="secondary" startIcon={<CalendarTodayOutlined />}>
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
    </Container>
  );
};

export default NavBar;
