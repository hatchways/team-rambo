import { useState } from 'react';
import { Box, CssBaseline, CircularProgress, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { BoardViewWrapper } from '../../components/Teams/BoardViewWrapper/BoardViewWrapper';
import { Sidebar } from '../../components/Teams/Sidebar/Sidebar';
import { TeamsAppBar } from '../../components/Teams/TeamsAppBar/TeamsAppBar';
import { useAuth } from '../../context/';
import { DialogWrapper } from '../../components/Teams/DialogWrapper/DialogWrapper';
import { TeamDialogList } from '../../components/Teams/TeamDialogList/TeamDialogList';

const TeamsDashboard = (): JSX.Element => {
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar loggedInUser={loggedInUser} />
      </Box>
      <Box>
        <Grid container alignItems="stretch">
          <Sidebar switcherFunc={handleClickOpen} />
          <BoardViewWrapper>
            <TeamsAppBar switcherFunc={handleClickOpen} />
          </BoardViewWrapper>
        </Grid>
        <DialogWrapper heading="Switch team" selectedValue={selectedValue} open={open} onClose={handleClose}>
          <TeamDialogList />
        </DialogWrapper>
      </Box>
    </Box>
  );
};

export default TeamsDashboard;
