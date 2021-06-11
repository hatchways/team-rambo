import { useState } from 'react';
import { Box, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { BoardAppBar } from '../../components/BoardAppBar/BoardAppBar';
import Board from '../../components/Kanban/Board';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import { useAuth, useKanban } from '../../context/';
import useStyles from './dashboardStyles';

const Dashboard = (): JSX.Element => {
  //const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { activeBoard } = useKanban();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = (): void => setOpenDrawer((prevOpen) => !prevOpen);

  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar loggedInUser={loggedInUser} />
        <BoardAppBar activeBoard={activeBoard} toggleDrawer={toggleDrawer} />
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
