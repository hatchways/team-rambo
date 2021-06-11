import { Grid } from '@material-ui/core';
import { Collaborator } from '../Collaborator/Collaborator';
import { ICollaborator } from '../../../interface';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import useStyles from './collaboratorViewStyles';

export const CollaboratorView = (): JSX.Element => {
  const classes = useStyles();

  const collaborators = [
    {
      name: 'andrew',
      email: 'andrew@gmail.com',
      picture: { url: `https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg` },
    },
    {
      name: 'peter',
      email: 'peter@gmail.com',
      picture: {
        url: `https://i.guim.co.uk/img/media/8a13052d4db7dcd508af948e5db7b04598e03190/0_294_5616_3370/master/5616.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=bcaa4eed2c1e6dab61c41a61e41433d9`,
      },
    },
    {
      name: 'bob',
      email: 'bob@gmail.com',
      picture: {
        url: `https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324.jpg`,
      },
    },
  ];

  return (
    <Droppable droppableId={'collaborators'}>
      {(provided: DroppableProvided) => (
        <Grid container direction="column" spacing={1} ref={provided.innerRef} {...provided.droppableProps}>
          {collaborators.map((user: ICollaborator, index) => {
            return <Collaborator key={user.email} index={index} collaborator={user} />;
          })}
          {provided.placeholder}
        </Grid>
      )}
    </Droppable>
  );
};
