import { useState, useEffect } from 'react';
import { Box, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import Board from '../../components/Kanban/Board';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import LoadingBoard from '../../components/LoadingBoard/LoadingBoard';
import { useAuth, useKanban } from '../../context/';
import useStyles from './dashboardStyles';

interface IBoardParams {
  id: string;
}

const Dashboard = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { fetchBoard, activeBoard, fetchingBoard } = useKanban();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { id } = useParams<IBoardParams>();

  const toggleDrawer = (): void => setOpenDrawer((prevOpen) => !prevOpen);

  useEffect(() => {
    fetchBoard(id);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [id]);

  if (!loggedInUser) {
    history.push('/login');

    return <LoadingBoard />;
  }

  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar handleDrawerToggle={toggleDrawer} />
        <OptionsDrawer open={openDrawer} setOpen={toggleDrawer} />
      </Box>
      <Box className={classes.buttonOverlay}>
        <AddColumnDialog />
      </Box>
      <Grid container className={classes.board} direction="row" justify="center" alignItems="center">
        {fetchingBoard ? (
          <Grid item xs={12} className={classes.loading}>
            <CircularProgress size={150} />
          </Grid>
        ) : (
          <Grid item xs={10}>
            <Board activeBoard={activeBoard} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
