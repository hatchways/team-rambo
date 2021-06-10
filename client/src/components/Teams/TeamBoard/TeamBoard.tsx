import { Grid, Card, CardContent, CardHeader, Avatar, IconButton, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { MoreHoriz, ArrowForward } from '@material-ui/icons';
import useStyles from './teamBoardStyles';
import { ITeamBoard } from '../../../interface/Board';
import testAvatar1 from '../../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
import testAvatar2 from '../../../Images/775db5e79c5294846949f1f55059b53317f51e30.png';
import testAvatar3 from '../../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';

interface Props {
  board: ITeamBoard;
}

const TeamBoard = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const board = {
    _id: '123123',
    name: 'Gilette',
    description: 'This is some description example for a board. Please use it carefully.',
    collaborators: [
      { _id: 1, email: 'email1', picture: { url: testAvatar1 } },
      { _id: 2, email: 'email2', picture: { url: testAvatar2 } },
      { _id: 3, email: 'email3', picture: { url: testAvatar3 } },
    ],
    admins: [{ email: 'email1', picture: { url: testAvatar1 } }],
    createdAt: Date.now(),
  };

  const handleClick = (): void => {
    history.push(`dashboard/${board._id}`);
  };

  return (
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
                  {board.collaborators.map((user) => (
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
                  }).format(board.createdAt)}
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
  );
};
{
  /*<Typography variant="h6">Gilette</Typography>*/
}

export default TeamBoard;
