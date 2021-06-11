import { useState } from 'react';
import { Box, CssBaseline, CircularProgress, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { BoardViewWrapper } from '../../components/Teams/BoardViewWrapper/BoardViewWrapper';
import { Sidebar } from '../../components/Teams/Sidebar/Sidebar';
import { TeamsAppBar } from '../../components/Teams/TeamsAppBar/TeamsAppBar';
import { DialogWrapper } from '../../components/Teams/DialogWrapper/DialogWrapper';
import { TeamDialogList } from '../../components/Teams/TeamDialogList/TeamDialogList';
import { TeamBoardView } from '../../components/Teams/TeamBoardView/TeamBoardView';
import { useAuth, useUser, SnackBarContext, useSnackBar } from '../../context/';
import { dummyBoards } from '../../components/Teams/TeamBoardView/boardsDummyData';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';

const TeamsDashboard = (): JSX.Element => {
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const { startAddingMember, endAddingMember } = useUser();
  const { updateSnackBarMessage } = useSnackBar();

  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  const openTeamSwitch = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onDragEnd = (result: DropResult): void => {
    console.log(result);
    endAddingMember();
    if (!result.destination) return;
    //implement fetch and then success or error message
    updateSnackBarMessage('success!');
  };

  const onDragStart = (item: DragStart): void => {
    if (item.source.droppableId != 'collaborators') return;
    startAddingMember();
  };

  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar loggedInUser={loggedInUser} />
      </Box>
      <Box>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Grid container alignItems="stretch">
            <Sidebar />
            <BoardViewWrapper>
              <Grid container direction="column">
                <Grid item>
                  <TeamsAppBar />
                </Grid>
                <Grid item>
                  <TeamBoardView boards={dummyBoards} />
                </Grid>
              </Grid>
            </BoardViewWrapper>
          </Grid>
        </DragDropContext>
        <DialogWrapper heading="Switch team" open={open} onClose={handleClose}>
          <TeamDialogList />
        </DialogWrapper>
      </Box>
    </Box>
  );
};

export default TeamsDashboard;
