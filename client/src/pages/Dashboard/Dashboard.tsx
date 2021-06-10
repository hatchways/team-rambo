import { useState, useEffect } from 'react';
import { Box, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import Board from '../../components/Kanban/Board';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import { useAuth, useKanban } from '../../context/';
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
  const { id } = useParams<IBoardParams>();

  const toggleDrawer = (): void => setOpenDrawer((prevOpen) => !prevOpen);

  useEffect(() => {
    fetchBoard(id);
  }, []);

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
