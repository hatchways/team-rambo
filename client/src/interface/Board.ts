import { Column } from './Column';
import { Card } from './Card';

export interface IBoard {
  _id: string;
  name: string;
  columns: Array<Column>;
  cards: Array<Card>;
  user: string;
  createdAt: string;
}

export interface BoardApiData {
  boards: Array<IBoard>;
  error?: { message: string };
}
