import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Add, MoreHoriz, SwapVert } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useTeam } from '../../../context/useTeams';
import { CollaboratorSearch } from '../CollaboratorSearch/CollaboratorSearch';
import { DialogWrapper } from '../DialogWrapper/DialogWrapper';
import { TeamBoardForm } from '../TeamBoardForm/TeamBoardForm';
import useStyles from './teamsAppBarStyles';

const AppBarButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.35)',
    },
  },
}))(Button);

const AppBarIconButton = withStyles(() => ({
  root: {
    color: 'white',
  },
}))(IconButton);

interface TeamsAppBarProps {
  teamSwitchFunc: () => void;
}

export const TeamsAppBar = ({ teamSwitchFunc }: TeamsAppBarProps): JSX.Element => {
  const { state } = useTeam();
  const [open, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<{ display: string; action: string }>({ display: '', action: '' });
  const smViewport = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const classes = useStyles();

  useEffect(() => {
    if (action.display === '' && action.action === '') return;
    setOpen((prev) => !prev);
  }, [action]);

  const handleClickOpen = (display: string, action: string) => setAction({ display, action });

  const handleClose = () => setOpen(false);

  return (
    <Grid lg={12} md={12} xs={12} item>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.flexDirection}>
          <Grid container={smViewport} justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5">{`${state.activeTeam?.name}'s`} boards</Typography>
            </Grid>
            <Hidden mdUp>
              <Grid item>
                <AppBarButton size="large" variant="outlined" onClick={teamSwitchFunc} endIcon={<SwapVert />}>
                  {state.activeTeam?.name}
                </AppBarButton>
              </Grid>
            </Hidden>
          </Grid>
          <Grid className={classes.appBarActionGroup} justify="flex-end" alignItems="center" spacing={1} container>
            <Grid item>
              <AppBarButton
                size="medium"
                variant="outlined"
                startIcon={<Add />}
                onClick={() => handleClickOpen('Invite collaborator', 'collaborator')}
              >
                Invite Collaborator
              </AppBarButton>
              <AppBarButton
                size="medium"
                variant="outlined"
                startIcon={<Add />}
                onClick={() => handleClickOpen('Create new team board', 'team')}
              >
                New Team Board
              </AppBarButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <DialogWrapper heading={action.display} open={open} onClose={handleClose}>
        <Container>
          {action.action === 'team' ? (
            <Box className={classes.dialogWrapper}>
              <TeamBoardForm />
            </Box>
          ) : (
            <Box className={classes.dialogWrapper}>
              <CollaboratorSearch />
            </Box>
          )}
        </Container>
      </DialogWrapper>
    </Grid>
  );
};
