import { IColumn, ICard, IUser } from './';

export interface IBoard {
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
  user: string;
  collaborators: Array<IUser>;
  admins: Array<IUser>;
  createdAt: number;
}

export interface BoardApiData {
  boards: Array<IBoard>;
  error?: { message: string };
}

export interface NewBoardApiData {
  board: IBoard;
  error?: { messge: string };
}
