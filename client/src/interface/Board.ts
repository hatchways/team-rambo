import { User } from './User';
import { Column } from './Column';
import { Card } from './Card';

export interface Board {
  name: string;
  columns: Array<Column>;
  cards: Array<Card>;
  user: User;
  createdAt: string;
}
