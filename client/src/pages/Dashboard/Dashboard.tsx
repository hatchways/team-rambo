import { useState, useEffect } from 'react';
import { Box, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import Board from '../../components/Kanban/Board';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import MyCalendar from '../../components/Calendar/Calendar';
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
  const [isBoard, setIsBoard] = useState<boolean>(true);
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
        <NavBar handleDrawerToggle={toggleDrawer} setIsBoard={setIsBoard} />
        <OptionsDrawer open={openDrawer} setOpen={toggleDrawer} />
      </Box>
      {fetchingBoard ? (
        <Grid item xs={12} className={classes.loading}>
          <CircularProgress size={150} />
        </Grid>
      ) : isBoard ? (
        <>
          <Box className={classes.buttonOverlay}>
            <AddColumnDialog />
          </Box>
          <Grid container className={classes.board} direction="row" justify="center" alignItems="center">
            <Grid item xs={10}>
              <Board activeBoard={activeBoard} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Box className={classes.calendarMain}>
          <MyCalendar />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
