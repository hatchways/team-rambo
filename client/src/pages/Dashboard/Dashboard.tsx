import { Box, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './dashboardStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect } from 'react';
import Board from '../../components/Kanban/Board';
import { KanbanProvider } from '../../context/useKanbanContext';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import { DialogProvider } from '../../context/useDetailContext';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Box>
      <CssBaseline />
      <NavBar loggedInUser={loggedInUser} />
      <Box className={classes.buttonOverlay}>
        <AddColumnDialog />
      </Box>
      <Grid container className={classes.board} direction="row" justify="center" alignItems="center">
        <Grid item xs={10}>
          <KanbanProvider>
            <DialogProvider>
              <Board />
            </DialogProvider>
          </KanbanProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
