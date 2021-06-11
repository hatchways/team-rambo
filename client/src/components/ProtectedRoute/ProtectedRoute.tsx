import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import LoadingBoard from '../../components/LoadingBoard/LoadingBoard';

const ProtectedRoute = (routeProps: RouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();

  // Show circular progress bar while waiting on response from useAuth
  if (loggedInUser === undefined) return <LoadingBoard />;
  else return loggedInUser ? <Route {...routeProps} /> : <Redirect to={{ pathname: '/login' }} />;
};

export default ProtectedRoute;
