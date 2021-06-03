import { IUser } from './User';

export interface IAuthApiDataSuccess {
  message: string;
  user: IUser;
  token: string;
}

export interface IAuthApiData {
  error?: { message: string };
  success?: IAuthApiDataSuccess;
}
