import { Card } from './Card';

export interface Column {
  _id: string;
  name: string;
  cards: Array<Card>;
  createdAt: string;
}
