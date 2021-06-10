import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Hidden,
  IconButton,
  TextField,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Add, MoreHoriz, SwapVert } from '@material-ui/icons';
import { useState } from 'react';
import * as yup from 'yup';
import { DialogForm } from '../DialogForm/DialogForm';
import { DialogWrapper } from '../DialogWrapper/DialogWrapper';
import useStyles from './teamsAppBarStyles';

interface TeamForm {
  name: string;
  description: string;
}

const teamValidation = yup.object({
  name: yup.string().required('Please enter a board name'),
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

interface TeamsAppBarProps {
  switcherFunc: () => void;
}

export const TeamsAppBar = ({ switcherFunc }: TeamsAppBarProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [action, setAction] = useState<{ display: string; action: string }>({ display: '', action: '' });
  const smViewport = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
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
        <Toolbar className={classes.flexDirection}>
          <Grid container={smViewport} justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5">Your boards</Typography>
            </Grid>
            <Hidden mdUp>
              <Grid item>
                <AppBarButton size="large" variant="outlined" onClick={switcherFunc} endIcon={<SwapVert />}>
                  Team Rambo
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
      <DialogWrapper heading="Create new team board" open={open} selectedValue={selectedValue} onClose={handleClose}>
        {action.action === 'team' ? (
          <Box className={classes.dialogWrapper}>
            <Container>
              <DialogForm<TeamForm>
                initialValues={{ name: '', description: '' }}
                validation={teamValidation}
                onSubmit={submitHandler}
              >
                {(formik) => (
                  <Box>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Board name"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      autoFocus
                      required
                    />
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      type="text"
                      variant="outlined"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                      rows={4}
                      multiline
                    />
                    <Box>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="h6" className={classes.collaboratorsHeading}>
                            Select collaborators to add.
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button color="primary" variant="contained" size="small">
                            Add everyone
                          </Button>
                        </Grid>
                      </Grid>
                      <Box className={classes.collaborators}>
                        <Chip avatar={<Avatar>E</Avatar>} label="Ethan Moffat" />
                        <Chip avatar={<Avatar>A</Avatar>} label="Ahmed" />
                        <Chip avatar={<Avatar>J</Avatar>} label="Jon Myers" />
                        <Chip avatar={<Avatar>G</Avatar>} label="Gabriel" />
                      </Box>
                    </Box>
                  </Box>
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
