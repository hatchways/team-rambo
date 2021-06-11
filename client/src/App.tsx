import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { theme } from './themes/theme';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { TeamsWrapper } from './components/Teams/TeamsWrapper/TeamsWrapper';
import ProtectedRoute from '../src/components/ProtectedRoute';
import {
  AuthProvider,
  SocketProvider,
  SnackBarProvider,
  KanbanProvider,
  DialogProvider,
  UserProvider,
} from './context/';

const App = (): JSX.Element => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <SnackBarProvider>
        <AuthProvider>
          <UserProvider>
            <SocketProvider>
              <KanbanProvider>
                <DialogProvider>
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                    <ProtectedRoute exact path="/teams" component={TeamsWrapper} />
                    <Route path="*">
                      <Redirect to="/login" />
                    </Route>
                  </Switch>
                </DialogProvider>
              </KanbanProvider>
            </SocketProvider>
          </UserProvider>
        </AuthProvider>
      </SnackBarProvider>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
