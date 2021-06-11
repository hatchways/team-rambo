import { IUser } from './User';
import { ITeamBoard } from './Board';
import { Dispatch } from 'react';

export interface ICollaborator {
  profile?: string;
  picture: { url: string };
  name: string;
  email: string;
}
export interface IInvite {
  _id: string;
  team: string;
  recipient: string;
  sender: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ITeam {
  _id: string;
  boards: ITeamBoard[];
  collaborators: IUser[];
  invites: IInvite[];
  name: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeamAction {
  type: string;
  payload: any; //TODO: change this to be a union of API responses
}
export interface ITeamState {
  teams: ITeam[];
  activeTeam: ITeam;
}

export interface ITeamContext {
  state: ITeamState;
  dispatch: Dispatch<ITeamAction>;
}
