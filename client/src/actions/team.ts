import { ITeamAction, ITeamState } from '../interface';

export const SET_TEAMS = 'SET_TEAMS';
export const SET_ACTIVE_TEAM = 'SET_ACTIVE_TEAM';
export const CREATE_TEAM_BOARD = 'CREATE_TEAM_BOARD';

export const reducer = (draft: ITeamState, action: ITeamAction) => {
  switch (action.type) {
    case SET_TEAMS:
      draft.teams = action.payload;
      return draft;
    case SET_ACTIVE_TEAM:
      localStorage.setItem('lastActiveTeam', JSON.stringify(action.payload));
      draft.activeTeam = action.payload;
      return draft;
    case CREATE_TEAM_BOARD:
      draft.activeTeam.boards.push(action.payload);
      return draft;
    default:
      draft;
  }
};
