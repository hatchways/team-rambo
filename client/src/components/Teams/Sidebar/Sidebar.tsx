import { useState } from 'react';
import { Box, Button, Container, Grid, Typography, Hidden, DialogTitle } from '@material-ui/core';
import useStyles from './sidebarStyles';
import useChildStyles from '../shared/childStyles';
import clsx from 'clsx';
import { SwapVert } from '@material-ui/icons';
import { Collaborator } from '../Collaborator/Collaborator';
import { DialogWrapper } from '../shared/TeamDialog';
import { TeamDialogList } from '../TeamDialogList/TeamDialogList';
import { CollaboratorView } from '../CollaboratorView/CollaboratorView';

export const Sidebar = (): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('Rambo');
  const childClasses = useChildStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
              onClick={handleClickOpen}
              endIcon={<SwapVert />}
            >
              {selectedValue}
            </Button>
            <DialogWrapper selectedValue={selectedValue} open={open} onClose={handleClose}>
              <DialogTitle>Switch Team</DialogTitle>
              <TeamDialogList />
            </DialogWrapper>
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
