import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { DialogProvider } from '../../context/useDialogContext';
import { KanbanProvider } from '../../context/useKanbanContext';
import getUserBoards from '../../helpers/APICalls/getUserBoards';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { IBoard } from '../../interface/Board';
import Board from '../../components/Kanban/Board';
import AddColumnDialog from '../../components/AddColumnDialog/AddColumnDialog';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import useStyles from './dashboardStyles';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [boards, setBoards] = useState<Array<IBoard>>([]);
  const history = useHistory();

  const getAllUserBoards = async () => {
    const { boards } = await getUserBoards();
    if (boards) setBoards(boards);
  };

  const getNewBoard = async (newBoard: IBoard) => {
    setBoards((boards) => [...boards, newBoard]);
  };

  useEffect(() => {
    getAllUserBoards();
  }, []);

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
    <Box>
      <CssBaseline />
      <Box>
        <NavBar loggedInUser={loggedInUser} handleDrawerToggle={toggleDrawer} onAddNewBoard={getNewBoard} />
        <OptionsDrawer open={openDrawer} setOpen={toggleDrawer} boards={boards} />
      </Box>
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
