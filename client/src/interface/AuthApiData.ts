import { IBoard, IUser } from './';

export interface IAuthApiDataSuccess {
  message: string;
  user: IUser;
  token: string;
  board?: IBoard;
}

export interface IAuthApiData {
  error?: string;
  success?: IAuthApiDataSuccess;
}
