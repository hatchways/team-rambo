import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { IUser, IAuthApiData, IAuthApiDataSuccess } from '../interface/';
import { loginWithCookies, logout as logoutApi } from '../helpers/';

interface IAuthContext {
  loggedInUser: IUser | null | undefined;
  updateLoginContext: (data: IAuthApiDataSuccess) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<IUser | null | undefined>();
  const history = useHistory();

  const updateLoginContext = useCallback(async (data: IAuthApiDataSuccess) => {
    setLoggedInUser(data.user);
    return;
  }, []);

  const logout = useCallback(async () => {
    // needed to remove token cookie
    logoutApi()
      .then(() => {
        history.push('/login');
        setLoggedInUser(null);

        return;
      })
      .catch((error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      loginWithCookies().then((data: IAuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);

          return;
        }

        setLoggedInUser(null);

        return;
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);

  return <AuthContext.Provider value={{ loggedInUser, updateLoginContext, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
