import { Grid, Card, CardContent, CardHeader, Avatar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { MoreHoriz, ArrowForward } from '@material-ui/icons';
import { ITeamBoard } from '../../../interface';
import { IUser } from '../../../interface';
import { useUser, useAuth, useKanban } from '../../../context';
import useStyles from './teamBoardStyles';
import { useTeam } from '../../../context/useTeams';

interface Props {
  board: ITeamBoard;
}

export const TeamBoard = ({ board }: Props): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const { loggedInUser } = useAuth();
  const { isAddingMember } = useUser();
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const { state } = useTeam();
  const { setActiveBoard } = useKanban();

  useEffect(() => {
    if (!loggedInUser) {
      setIsUserAdmin(false);
      return;
    }
    const admins = board.admins.map((user) => user.email);
    if (admins.includes(loggedInUser.email)) setIsUserAdmin(true);

    return;
  }, [loggedInUser]);

  const handleClick = (): void => {
    setActiveBoard(board);
    history.push(`/dashboard/${board._id}`);
  };

  const handleBoardOptionsClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Droppable droppableId={board._id} isDropDisabled={!isUserAdmin}>
      {(provided: DroppableProvided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Card className={clsx(classes.root, isAddingMember && !isUserAdmin && classes.cannotModify)}>
            <CardHeader
              classes={{
                title: classes.title,
                root: classes.header,
              }}
              title={board.name}
              action={
                <>
                  <IconButton onClick={handleBoardOptionsClick} aria-label="settings">
                    <MoreHoriz style={{ fontSize: 20 }} />
                  </IconButton>
                  <Menu open={open} anchorEl={anchorEl} onClose={handleClose} elevation={2} keepMounted>
                    <MenuItem>Remove Board</MenuItem>
                  </Menu>
                </>
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
                        <Avatar alt={board.user.email} src={board.user.picture.url} className={classes.avatar} />
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
