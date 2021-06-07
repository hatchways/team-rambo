import { useState } from 'react';
import { Box, CssBaseline, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import OptionsDrawer from '../../components/OptionsDrawer/OptionsDrawer';
import { useAuth, useKanban } from '../../context/';
import useStyles from '../shared/pageStyles';

const TeamsDashboard = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = (): void => setOpenDrawer((prevOpen) => !prevOpen);

  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  return (
    <Box>
      <CssBaseline />
      <Box>
        <NavBar loggedInUser={loggedInUser} handleDrawerToggle={toggleDrawer} />
      </Box>
      <Box>
        <h1>Teams Dashboard</h1>
      </Box>
    </Box>
  );
};

export default TeamsDashboard;
