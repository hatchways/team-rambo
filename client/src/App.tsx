import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { theme } from './themes/theme';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider, SocketProvider, SnackBarProvider, KanbanProvider, DialogProvider } from './context/';

const App = (): JSX.Element => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <SnackBarProvider>
        <AuthProvider>
          <SocketProvider>
            <KanbanProvider>
              <DialogProvider>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </DialogProvider>
            </KanbanProvider>
          </SocketProvider>
        </AuthProvider>
      </SnackBarProvider>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
