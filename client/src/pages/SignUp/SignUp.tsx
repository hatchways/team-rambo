import { CssBaseline, Paper, Box, Grid, Link, Divider, Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import useStyles from './signUpStyles';
import { register } from '../../helpers/';
import SignUpForm from './SignUpForm/SignUpForm';
import { useAuth, useSnackBar } from '../../context/';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    register(email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
        debugger;
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6} className={classes.image} />
      <Grid item xs={12} sm={6} md={6} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box maxWidth={450} p={3} alignSelf="center" className={classes.registerForm}>
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Sign up to Kanban
                </Typography>
              </Grid>
            </Grid>
            <SignUpForm handleSubmit={handleSubmit} />
          </Box>
          <Box className={classes.loginFooter}>
            <Divider className={classes.divider} />
            <Typography className={classes.haveAccount}>Already has an account?</Typography>
            <Link href="/login">
              <Typography className={classes.login}>Login</Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
