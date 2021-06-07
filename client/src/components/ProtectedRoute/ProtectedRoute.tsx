import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './protectedRouteStyles';

const ProtectedRoute = (routeProps: RouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();
  const classes = useStyles();

  // Show circular progress bar while waiting on response from useAuth
  if (loggedInUser === undefined)
    return (
      <Grid spacing={4} container justify="center" className={classes.loadingScreen}>
        <Grid item>
          <CircularProgress size={150} />
        </Grid>
        <Grid item>
          <Typography variant="h4" className={classes.loadingScreenText}>
            Kanban
          </Typography>
        </Grid>
      </Grid>
    );
  else return loggedInUser ? <Route {...routeProps} /> : <Redirect to={{ pathname: '/login' }} />;
};

export default ProtectedRoute;
