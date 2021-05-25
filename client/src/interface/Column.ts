import { Card } from './Card';

export interface Column {
  name: string;
  cards: Array<Card>;
  createdAt: string;
}
