import { Box, Button, Container, Grid, Typography, Hidden } from '@material-ui/core';
import useStyles from './sidebarStyles';
import useChildStyles from '../shared/childStyles';
import clsx from 'clsx';
import { SwapVert } from '@material-ui/icons';
import { Collaborator } from '../Collaborator/Collaborator';
import { DialogWrapper } from '../shared/TeamDialog';
import { TeamDialogList } from '../TeamDialogList/TeamDialogList';
import { CollaboratorView } from '../CollaboratorView/CollaboratorView';

interface SidebarProps {
  teamSwitchFunc: () => void;
}

export const Sidebar = ({ teamSwitchFunc }: SidebarProps): JSX.Element => {
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
              Team Rambo
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
