import { IRequest } from './types';

const BASE_ROUTE = '/team';

export const getUserTeams: IRequest<null> = {
  route: BASE_ROUTE,
  method: 'GET',
  body: null,
};

export const getTeam = (id: string): IRequest<null> => {
  return {
    route: `${BASE_ROUTE}/${id}`,
    method: 'GET',
    body: null,
  };
};

interface IBoardBody {
  name: string;
  description: string;
}
export const createTeamBoard = (id: string, data: IBoardBody): IRequest<IBoardBody> => {
  return {
    route: `${BASE_ROUTE}/${id}/boards`,
    method: 'POST',
    body: data,
  };
};

export const searchUsers = (search: string): IRequest<null> => {
  return {
    route: `/users?search=${search}`,
    method: 'GET',
    body: null,
  };
};

interface IInviteBody {
  recipient: string;
}
export const inviteUser = (team: string, recipient: string): IRequest<IInviteBody> => {
  return {
    route: `${BASE_ROUTE}/${team}/invite`,
    method: 'POST',
    body: {
      recipient,
    },
  };
};
