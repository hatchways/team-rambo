import { CssBaseline, Paper, Box, Grid, Divider, Link, Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import useStyles from './loginStyles';
import { login } from '../../helpers/';
import LoginForm from './LoginForm/LoginForm';
import { useAuth, useSnackBar, useKanban } from '../../context/';
import { useEffect } from 'react';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext, loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const { sendToFirstBoard } = useKanban();

  useEffect(() => {
    console.log(loggedInUser);
    if (loggedInUser) sendToFirstBoard();
  }, [loggedInUser, sendToFirstBoard]);

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error, 'error');
      } else if (data.success) {
        updateLoginContext(data.success);
        sendToFirstBoard();
      } else {
        // should not get here from backend but this catch is for an unknown issue
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again', 'error');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6} className={classes.image} />
      <Grid item xs={12} sm={6} md={6} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box width="100%" maxWidth={450} p={3} alignSelf="center" className={classes.login}>
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Welcome back!
                </Typography>
              </Grid>
            </Grid>
            <LoginForm handleSubmit={handleSubmit} />
          </Box>
          <Box width="100%" className={classes.registerFooter}>
            <Divider className={classes.divider} />
            <Typography className={classes.haveAccount}>Don&apos;t have an account?</Typography>
            <Link href="/signup">
              <Typography className={classes.create}>Create</Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
