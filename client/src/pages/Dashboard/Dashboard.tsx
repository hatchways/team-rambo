import { useEffect, useState } from 'react';
import { Box, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { KanbanProvider, useKanban } from '../../context/useKanbanContext';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import Board from '../../components/Kanban/Board';
import useStyles from './dashboardStyles';

const Dashboard = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { activeBoard } = useKanban();

  const toggleDrawer = (): void => setOpenDrawer((prevOpen) => !prevOpen);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  // These both do the same check; should remove redundancy
  if (loggedInUser === undefined || !activeBoard) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar loggedInUser={loggedInUser} handleDrawerToggle={toggleDrawer} />
        <OptionsDrawer open={openDrawer} setOpen={toggleDrawer} setActiveBoard={() => console.log('sup')} />
      </Box>
      <Box className={classes.buttonOverlay}>
        <AddColumnDialog />
      </Box>
      <Grid container className={classes.board} direction="row" justify="center" alignItems="center">
        <Grid item xs={10}>
          <KanbanProvider>
            <Board activeBoard={activeBoard} />
          </KanbanProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
