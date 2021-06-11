import { Box, Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { Collaborator } from '../Collaborator/Collaborator';
import { IUser } from '../../../interface';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import useStyles from './collaboratorViewStyles';
import { useTeam } from '../../../context/useTeams';
import { useAuth } from '../../../context';
import { useHistory } from 'react-router-dom';

export const CollaboratorView = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const { state } = useTeam();
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    history.push('/login');

    return <CircularProgress />;
  }

  if (state.activeTeam.collaborators.length === 0) {
    return (
      <Box>
        <Typography variant="h5" className={classes.inviteText}>
          Invite some collaborators to get started
        </Typography>
        <Button color="primary" variant="contained" size="large" disableElevation>
          Invite collaborator
        </Button>
      </Box>
    );
  }

  return (
    <Droppable droppableId={'collaborators'}>
      {(provided: DroppableProvided) => (
        <Grid container direction="column" spacing={1} ref={provided.innerRef} {...provided.droppableProps}>
          {state.activeTeam.collaborators.map((user: IUser, index) => {
            if (user.email === loggedInUser.email) return;
            return <Collaborator key={user.email} index={index} collaborator={user} />;
          })}
          {provided.placeholder}
        </Grid>
      )}
    </Droppable>
  );
};
