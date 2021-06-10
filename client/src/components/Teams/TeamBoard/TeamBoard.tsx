import { Grid, Card, CardContent, CardHeader, Avatar, IconButton, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import { MoreHoriz, ArrowForward } from '@material-ui/icons';
import { ITeamBoard, IUser } from '../../../interface';
import useStyles from './teamBoardStyles';

interface Props {
  board: ITeamBoard;
}

export const TeamBoard = ({ board }: Props): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (): void => {
    history.push(`dashboard/${board._id}`);
  };

  return (
    <Droppable droppableId={board._id}>
      {(provided: DroppableProvided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Card className={classes.root}>
            <CardHeader
              classes={{
                title: classes.title,
                root: classes.header,
              }}
              title={board.name}
              action={
                <IconButton aria-label="settings">
                  <MoreHoriz style={{ fontSize: 20 }} />
                </IconButton>
              }
            />
            <CardContent
              classes={{
                root: classes.content,
              }}
            >
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="body1">{board.description}</Typography>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={4}>
                      <AvatarGroup max={3} spacing="small">
                        {board.collaborators.map((user: IUser) => (
                          <Avatar key={user.email} alt={user.email} src={user.picture.url} className={classes.avatar} />
                        ))}
                      </AvatarGroup>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" className={classes.date}>
                        {new Intl.DateTimeFormat('en-CA', {
                          year: 'numeric',
                          month: 'long',
                          day: '2-digit',
                        }).format(new Date(board.createdAt))}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container direction="row" justify="flex-end">
                        <Grid item>
                          <IconButton onClick={handleClick}>
                            <ArrowForward />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      )}
    </Droppable>
  );
};
