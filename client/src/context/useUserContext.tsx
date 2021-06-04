import { useState, createContext, useContext, useCallback, useEffect, FunctionComponent } from 'react';
import { useAuth } from './useAuthContext';

interface IPicture {
  url: string;
}

interface IUserContext {
  picture: IPicture | null | undefined;
  updatePicture: (picture: IPicture) => void;
}

export const UserContext = createContext<IUserContext>({ picture: null, updatePicture: () => null });

export const UserProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [picture, setPicture] = useState<IPicture | null | undefined>(null);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser?.picture) setPicture(loggedInUser.picture);
  }, [loggedInUser]);

  const updatePicture = useCallback((picture: IPicture) => {
    setPicture(picture);
  }, []);

  return <UserContext.Provider value={{ picture, updatePicture }}>{children}</UserContext.Provider>;
};

export const useUser = (): IUserContext => {
  return useContext(UserContext);
};
