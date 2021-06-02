import { IColumn } from './Column';
import { ICard } from './Card';

export interface IBoard {
  _id: string;
  name: string;
  columns: Array<IColumn>;
  cards: Array<ICard>;
  user: string;
  createdAt: string;
}

export interface BoardApiData {
  boards: Array<IBoard>;
  error?: { message: string };
}

export interface NewBoardApiData {
  board: IBoard;
  error?: { messge: string };
}
