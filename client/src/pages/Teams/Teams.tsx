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
import { useAuth, useUser, useSnackBar } from '../../context/';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { useTeam } from '../../context/useTeams';

const TeamsDashboard = (): JSX.Element => {
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const { startAddingMember, endAddingMember } = useUser();
  const { updateSnackBarMessage } = useSnackBar();
  const { state } = useTeam();

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
        <NavBar />
      </Box>
      <Box>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Grid container alignItems="stretch">
            <Sidebar teamSwitchFunc={openTeamSwitch} />
            <BoardViewWrapper>
              <Grid container direction="column">
                <Grid item>
                  <TeamsAppBar teamSwitchFunc={openTeamSwitch} />
                </Grid>
                <Grid item>
                  <TeamBoardView boards={state.activeTeam.boards} />
                </Grid>
              </Grid>
            </BoardViewWrapper>
          </Grid>
        </DragDropContext>
        <DialogWrapper heading="Switch team" open={open} onClose={handleClose}>
          <TeamDialogList close={handleClose} />
        </DialogWrapper>
      </Box>
    </Box>
  );
};

export default TeamsDashboard;
