import {
  AppBar,
  Button,
  Grid,
  IconButton,
  TextField,
  Box,
  Toolbar,
  Typography,
  withStyles,
  DialogTitle,
  Container,
} from '@material-ui/core';
import { Add, MoreHoriz } from '@material-ui/icons';
import { useState } from 'react';
import * as yup from 'yup';
import { DialogForm } from '../DialogForm/DialogForm';
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

  const handleClickOpen = (display: string, action: string) => {
    setAction({ display, action });
    setOpen(true);
  };

  const submitHandler = (values: TeamForm) => {
    console.log(values);
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
                onClick={() => handleClickOpen('Invite collaborator', 'collaborator')}
              >
                Invite Collaborator
              </AppBarButton>
              <AppBarButton
                size="medium"
                variant="outlined"
                startIcon={<Add />}
                onClick={() => handleClickOpen('Create new board', 'team')}
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
          <Box className={classes.dialogWrapper}>
            <DialogTitle>
              <Typography variant="h5">Create a new team board</Typography>
            </DialogTitle>
            <Container>
              <DialogForm<TeamForm>
                initialValues={{ name: '', description: '' }}
                validation={teamValidation}
                onSubmit={submitHandler}
              >
                {(formik) => (
                  <>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Board name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      type="text"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                    />
                  </>
                )}
              </DialogForm>
            </Container>
          </Box>
        ) : (
          <h1>Collaborator action</h1>
        )}
      </DialogWrapper>
    </Grid>
  );
};
