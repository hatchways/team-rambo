import { useState, createContext, useContext, useCallback, useEffect, FunctionComponent } from 'react';
import { useAuth } from './useAuthContext';

interface IPicture {
  url: string;
}

interface IUserContext {
  picture: IPicture | null | undefined;
  updatePicture: (picture: IPicture) => void;
  isAddingMember: boolean;
  startAddingMember: () => void;
  endAddingMember: () => void;
}

export const UserContext = createContext<IUserContext>({
  picture: null,
  updatePicture: () => null,
  isAddingMember: false,
  startAddingMember: () => null,
  endAddingMember: () => null,
});

export const UserProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [picture, setPicture] = useState<IPicture | null | undefined>(null);
  const [isAddingMember, setIsAddingMember] = useState<boolean>(false);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser?.picture) setPicture(loggedInUser.picture);
  }, [loggedInUser]);

  const updatePicture = useCallback((picture: IPicture) => {
    setPicture(picture);
  }, []);

  const startAddingMember = (): void => {
    setIsAddingMember(true);
  };

  const endAddingMember = (): void => {
    setIsAddingMember(false);
  };

  return (
    <UserContext.Provider value={{ picture, updatePicture, isAddingMember, startAddingMember, endAddingMember }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => {
  return useContext(UserContext);
};
