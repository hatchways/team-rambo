import { IColumn, ICard } from './';

export interface IBoard {
  _id: string;
  name: string;
  columns: Array<IColumn>;
  cards: Array<ICard>;
  user: string;
  createdAt: string;
}

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
