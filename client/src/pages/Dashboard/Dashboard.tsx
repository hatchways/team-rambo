import { useState, useEffect } from 'react';
import { Box, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import Board from '../../components/Kanban/Board';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import MyCalendar from '../../components/Calendar/Calendar';
import Menu from '../../components/Kanban/ChangeDisplay/Menu';
import { useAuth, useKanban } from '../../context/';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import useStyles from './dashboardStyles';

interface IBoardParams {
  id: string;
}

const Dashboard = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { fetchBoard, activeBoard } = useKanban();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isBoard, setIsBoard] = useState<boolean>(true);
  const { id } = useParams<IBoardParams>();
  const location = useLocation();

  const toggleDrawer = (): void => setOpenDrawer((prevOpen) => !prevOpen);

  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  useEffect(() => {
    fetchBoard(id);
  }, [location]);

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
        {activeBoard._id != 'Initial' ? (
          <Grid item xs={10}>
            <Board activeBoard={activeBoard} />
          </Grid>
        ) : (
          <Grid item xs={12} className={classes.loading}>
            <CircularProgress size={150} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;

// {
//   isBoard ? (
//     <>
//       <Box className={classes.buttonOverlay}>
//         <AddColumnDialog />
//       </Box>
//       <Grid container className={classes.board} direction="row" justify="center" alignItems="center">
//         <Grid item xs={10}>
//           <Board activeBoard={activeBoard} />
//         </Grid>
//       </Grid>
//     </>
//   ) : (
//     <Box className={classes.calendar}>
//       <MyCalendar />
//     </Box>
//   );
// }
