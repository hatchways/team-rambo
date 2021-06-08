import { useState } from 'react';
import { AppBar, Button, Grid, Toolbar, Typography, withStyles, IconButton } from '@material-ui/core';
import { Add, MoreHoriz } from '@material-ui/icons';
import { DialogWrapper } from '../shared/TeamDialog';
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

export const TeamsAppBar = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const classes = useStyles();

  const handleClickOpen = (action: string) => {
    setAction(action);
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Grid lg={12} md={12} xs={12} item>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5">Your boards</Typography>
          <Grid className={classes.appBarActionGroup} justify="flex-end" alignItems="center" container>
            <Grid className={classes.appBarBtnGroup} item>
              <AppBarButton
                size="medium"
                variant="outlined"
                startIcon={<Add />}
                onClick={() => handleClickOpen('Invite collaborator')}
              >
                Invite Collaborator
              </AppBarButton>
              <AppBarButton
                size="medium"
                variant="outlined"
                startIcon={<Add />}
                onClick={() => handleClickOpen('Create new board')}
              >
                New Team Board
              </AppBarButton>
            </Grid>
            <Grid item className={classes.appBarIconBtn}>
              <AppBarIconButton size="medium">
                <MoreHoriz />
              </AppBarIconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <DialogWrapper heading={action} open={open} selectedValue={selectedValue} onClose={handleClose}></DialogWrapper>
    </Grid>
  );
};
