import { CircularProgress } from '@material-ui/core';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';

const ProtectedRoute = (routeProps: RouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();

  // Show circular progress bar while waiting on response from useAuth
  if (loggedInUser === undefined) return <CircularProgress />;
  else return loggedInUser ? <Route {...routeProps} /> : <Redirect to={{ pathname: '/login' }} />;
};

export default ProtectedRoute;
