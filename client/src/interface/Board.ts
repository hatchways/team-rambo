import { IColumn, ICard, IUser } from './';

export interface IPersonalBoard {
  _id: string;
  name: string;
  columns: Array<IColumn>;
  cards: Array<ICard>;
  user: string;
  createdAt: number;
}
export interface ITeamBoard {
  _id: string;
  name: string;
  description: string;
  columns: Array<IColumn>;
  cards: Array<ICard>;
  user: IUser;
  collaborators: Array<IUser>;
  admins: Array<IUser>;
  createdAt: number;
}

export type IBoard = ITeamBoard | IPersonalBoard;

export interface IBoardApiData {
  board: IBoard;
  error?: string;
}

export interface IBoardsApiData {
  boards: Array<IBoard>;
  error?: string;
}

export interface INewBoardApiData {
  board: IBoard;
  error?: { message: string };
}
