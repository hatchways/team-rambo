import { useState, createContext, useContext, useCallback, useEffect, FunctionComponent } from 'react';
import { useAuth } from './useAuthContext';

interface IUserContext {
  picture: string | null | undefined;
  updatePicture: (url: string) => void;
}

export const UserContext = createContext<IUserContext>({ picture: null, updatePicture: () => null });

export const UserProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [picture, setPicture] = useState<string | null | undefined>(null);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser?.picture) setPicture(loggedInUser.picture);
  }, [loggedInUser]);

  const updatePicture = useCallback((url: string) => {
    setPicture(url);
  }, []);

  return <UserContext.Provider value={{ picture, updatePicture }}>{children}</UserContext.Provider>;
};

export const useUser = (): IUserContext => {
  return useContext(UserContext);
};
