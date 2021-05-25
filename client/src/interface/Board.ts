import { User } from './User';
import { Column } from './Column';
import { Card } from './Card';

export interface Board {
  _id: string;
  name: string;
  columns: Array<Column>;
  cards: Array<Card>;
  user: User;
  createdAt: string;
}

export interface BoardApiData {
  boards: Array<Board>;
  error?: { message: string };
}
