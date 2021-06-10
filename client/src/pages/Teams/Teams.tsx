import { Box, CssBaseline, CircularProgress, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { BoardViewWrapper } from '../../components/Teams/BoardViewWrapper/BoardViewWrapper';
import { Sidebar } from '../../components/Teams/Sidebar/Sidebar';
import { TeamsAppBar } from '../../components/Teams/TeamsAppBar/TeamsAppBar';
import { TeamBoardView } from '../../components/Teams/TeamBoardView/TeamBoardView';
import { useAuth } from '../../context/';
import { dummyBoards } from '../../components/Teams/TeamBoardView/boardsDummyData';

const TeamsDashboard = (): JSX.Element => {
  const history = useHistory();
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar loggedInUser={loggedInUser} />
      </Box>
      <Box>
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
      </Box>
    </Box>
  );
};

export default TeamsDashboard;
