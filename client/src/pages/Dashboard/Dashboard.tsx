import { useState } from 'react';
import { Box, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Board from '../../components/Kanban/Board';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import MyCalendar from '../../components/Calendar/Calendar';
import Menu from '../../components/Kanban/ChangeDisplay/Menu';
import { useAuth, useKanban } from '../../context/';
import useStyles from './dashboardStyles';

const Dashboard = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { activeBoard } = useKanban();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isBoard, setIsBoard] = useState<boolean>(true);

  const toggleDrawer = (): void => setOpenDrawer((prevOpen) => !prevOpen);

  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar loggedInUser={loggedInUser} handleDrawerToggle={toggleDrawer} />
        <OptionsDrawer open={openDrawer} setOpen={toggleDrawer} />
      </Box>
      <Menu setIsBoard={setIsBoard} />
      {isBoard ? (
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
        <Box className={classes.calendar}>
          <MyCalendar />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
