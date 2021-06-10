import { Grid } from '@material-ui/core';
import { Collaborator } from '../Collaborator/Collaborator';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import useStyles from './collaboratorViewStyles';

interface ICollaborator {
  profile?: string;
  name: string;
  email: string;
}

export const CollaboratorView = (): JSX.Element => {
  const classes = useStyles();

  const collaborators = [
    { name: 'andrew', email: 'andrew@gmail.com' },
    { name: 'peter', email: 'peter@gmail.com' },
    { name: 'bob', email: 'bob@gmail.com' },
  ];

  return (
    <Droppable droppableId={'collaborators'}>
      {(provided: DroppableProvided) => (
        <Grid container direction="column" spacing={1} ref={provided.innerRef} {...provided.droppableProps}>
          {collaborators.map((user, index) => {
            return <Collaborator key={user.email} index={index} name={user.name} email={user.email} />;
          })}
          {provided.placeholder}
        </Grid>
      )}
    </Droppable>
  );
};
