import { AppBar, Button, Grid, IconButton, TextField, Toolbar, Typography, withStyles } from '@material-ui/core';
import { Add, MoreHoriz } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { DialogWrapper } from '../shared/TeamDialog';
import useStyles from './teamsAppBarStyles';

interface TeamForm {
  name: string;
  description: string;
}

const teamValidation = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});

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
  const [action, setAction] = useState<{ display: string; action: string }>({ display: '', action: '' });
  const classes = useStyles();
  const initialTeamValues: TeamForm = {
    name: '',
    description: '',
  };

  const handleClickOpen = (display: string, action: string) => {
    setAction({ display, action });
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
                onClick={() => handleClickOpen('Invite collaborator', 'team')}
              >
                Invite Collaborator
              </AppBarButton>
              <AppBarButton
                size="medium"
                variant="outlined"
                startIcon={<Add />}
                onClick={() => handleClickOpen('Create new board', 'collaborator')}
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
      <DialogWrapper open={open} selectedValue={selectedValue} onClose={handleClose}>
        {action.action === 'team' ? (
          <Formik
            initialValues={initialTeamValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });

              alert(JSON.stringify(values, null, 2));

              actions.setSubmitting(false);
            }}
            validationSchema={teamValidation}
          >
            {({ errors }) => {
              console.log(errors);
              return (
                <Form>
                  <TextField id="name" variant="outlined" placeholder="Enter name" name="name" />
                  <button type="submit">Create</button>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <h1>Collaborator action</h1>
        )}
      </DialogWrapper>
    </Grid>
  );
};
