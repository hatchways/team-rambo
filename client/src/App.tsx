import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from '../src/components/ProtectedRoute';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { KanbanProvider } from './context/useKanbanContext';

const App = (): JSX.Element => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <SnackBarProvider>
        <AuthProvider>
          <SocketProvider>
            <KanbanProvider>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </KanbanProvider>
          </SocketProvider>
        </AuthProvider>
      </SnackBarProvider>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
