import { createContext, ReactNode } from 'react';

const TeamsContext = createContext({});

export const TeamProvider = ({ children }: { children: ReactNode | ReactNode[] }): JSX.Element => {
  return <TeamsContext.Provider>{children}</TeamsContext.Provider>;
};
