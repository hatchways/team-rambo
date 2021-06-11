import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { reducer, SET_ACTIVE_TEAM } from '../actions/team';
import request from '../helpers/APICalls/teams/request';
import { getTeam, getUserTeams } from '../helpers/APICalls/teams/requests';
import { ITeamAction, ITeamState } from '../interface';
import { ITeam, ITeamContext } from '../interface/Teams';
import { SET_TEAMS } from '../actions/team';

const TeamContext = createContext<ITeamContext>({} as ITeamContext);

interface TeamProviderProps {
  children: ReactNode | ReactNode[];
}

export const TeamProvider = ({ children }: TeamProviderProps): JSX.Element => {
  const [state, dispatch] = useImmerReducer<ITeamState, ITeamAction>(reducer, {
    teams: [],
    activeTeam: {
      _id: '',
      name: '',
      owner: '',
      invites: [],
      collaborators: [],
      boards: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  useEffect(() => {
    const getUsersTeams = async () => {
      const response = await request(getUserTeams);
      dispatch({
        type: SET_TEAMS,
        payload: response,
      });
      const team = await request(getTeam(response[0]._id));
      dispatch({
        type: SET_ACTIVE_TEAM,
        payload: team,
      });
    };

    getUsersTeams();
  }, []);

  return <TeamContext.Provider value={{ state, dispatch }}>{children}</TeamContext.Provider>;
};

export const useTeam = () => {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error('useTeam must be used within TeamProvider');
  return ctx;
};
