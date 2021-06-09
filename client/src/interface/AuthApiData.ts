import { IUser } from './';

export interface IAuthApiDataSuccess {
  message: string;
  user: IUser;
  token: string;
}

export interface IAuthApiData {
  error?: string;
  success?: IAuthApiDataSuccess;
}
