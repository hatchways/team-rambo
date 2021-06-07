import { useState } from 'react';
import { Box, Grid, Typography, CssBaseline, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Board from '../../components/Kanban/Board';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import { useAuth, useKanban } from '../../context/';
import useStyles from './dashboardStyles';

const Dashboard = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { activeBoard } = useKanban();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = (): void => setOpenDrawer((prevOpen) => !prevOpen);

  if (!loggedInUser) {
    history.push('/login');

    return (
      <Grid spacing={4} container justify="center" className={classes.loadingScreen}>
        <Grid item>
          <CircularProgress size={150} />
        </Grid>
        <Grid item>
          <Typography variant="h4" className={classes.loadingScreenText}>
            Kanban
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar loggedInUser={loggedInUser} handleDrawerToggle={toggleDrawer} />
        <OptionsDrawer open={openDrawer} setOpen={toggleDrawer} />
      </Box>
      <Box className={classes.buttonOverlay}>
        <AddColumnDialog />
      </Box>
      <Grid container className={classes.board} direction="row" justify="center" alignItems="center">
        <Grid item xs={10}>
          <Board activeBoard={activeBoard} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
