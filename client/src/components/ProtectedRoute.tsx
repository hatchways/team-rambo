import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';

interface ProtectedRouteProps extends RouteProps {
  component: any;
  path: string;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { component: Component, path, ...rest } = props;
  const loggedInUser = useAuth();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        loggedInUser ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: path,
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
