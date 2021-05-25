import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './dashboardStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import getUserBoards from '../../helpers/APICalls/getUserBoards';
import { Board } from '../../interface/Board';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [boards, setBoards] = useState<Array<Board>>([]);
  const history = useHistory();

  const getAllUserBoards = async () => {
    try {
      const data = await getUserBoards();
      setBoards(data.boards);
    } catch (err) {
      setBoards([]);
    }
  };

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  const toggleDrawer = (): void => {
    setOpenDrawer((prevOpen) => !prevOpen);
  };

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <NavBar loggedInUser={loggedInUser} handleDrawerToggle={toggleDrawer} />
      <OptionsDrawer open={openDrawer} setOpen={toggleDrawer} boards={boards} />
    </Grid>
  );
}
