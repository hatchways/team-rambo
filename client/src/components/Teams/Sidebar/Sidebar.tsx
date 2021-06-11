import { Box, Button, Container, Grid, Typography, Hidden } from '@material-ui/core';
import useStyles from './sidebarStyles';
import useChildStyles from '../shared/childStyles';
import clsx from 'clsx';
import { SwapVert } from '@material-ui/icons';
import { CollaboratorView } from '../CollaboratorView/CollaboratorView';
import { useTeam } from '../../../context/useTeams';

interface SidebarProps {
  teamSwitchFunc: () => void;
}

export const Sidebar = ({ teamSwitchFunc }: SidebarProps): JSX.Element => {
  const { state } = useTeam();
  const classes = useStyles();
  const childClasses = useChildStyles();

  return (
    <Hidden smDown>
      <Grid item lg={3} className={clsx(classes.sidebar, childClasses.child)}>
        <Container>
          <Box className={classes.teamSwitcherWrapper}>
            <Button
              size="large"
              color="primary"
              variant="contained"
              disableElevation
              className={classes.teamSwitcherButton}
              onClick={teamSwitchFunc}
              endIcon={<SwapVert />}
            >
              {state.activeTeam?.name}
            </Button>
          </Box>
          <Box>
            <Box className={classes.collaboratorsWrapper}>
              <Typography variant="h6">Available collaborators</Typography>
            </Box>
            <Box className={classes.collaboratorList}>
              <CollaboratorView />
            </Box>
          </Box>
        </Container>
      </Grid>
    </Hidden>
  );
};
