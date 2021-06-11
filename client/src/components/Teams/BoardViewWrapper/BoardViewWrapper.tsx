import { Grid, Typography, Button, Container, withStyles, Theme } from '@material-ui/core';
import { ReactNode, useState } from 'react';
import { useTeam } from '../../../context/useTeams';
import { DialogWrapper } from '../DialogWrapper/DialogWrapper';
import { TeamBoardForm } from '../TeamBoardForm/TeamBoardForm';

interface BoardViewWrapperProps {
  children: ReactNode | ReactNode[];
}

const GridPaddedTop = withStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
}))(Grid);

export const BoardViewWrapper = ({ children }: BoardViewWrapperProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const { state } = useTeam();

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  if (state.activeTeam.boards.length === 0) {
    return (
      <>
        <GridPaddedTop lg={9} md={8} container justify="center" alignItems="center">
          <Grid item>
            <Container>
              <Typography variant="h2" gutterBottom>
                Create a team board
              </Typography>
              <Typography variant="subtitle1" paragraph gutterBottom>
                Team boards allow you to add members and collaborate on any projects your team has in the pipelines. To
                get started, create a new team board and drag some members to it.
              </Typography>
              <Button color="primary" variant="contained" size="large" onClick={openDialog} disableElevation>
                Start Collaborating
              </Button>
            </Container>
          </Grid>
        </GridPaddedTop>
        <DialogWrapper heading="Create new team board" open={open} onClose={closeDialog}>
          <Container>
            <TeamBoardForm />
          </Container>
        </DialogWrapper>
      </>
    );
  }

  return (
    <Grid lg={9} md={8} container>
      {children}
    </Grid>
  );
};
