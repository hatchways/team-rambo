import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect } from 'react';
import Board from '../../components/Kanban/Board';
import { KanbanProvider } from '../../context/useKanbanContext';

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
      <Box>
        <NavBar loggedInUser={loggedInUser} />
      </Box>
      <Box className={classes.board}>
        <KanbanProvider>
          <Board />
        </KanbanProvider>
      </Box>
    </Box>
  );
}
