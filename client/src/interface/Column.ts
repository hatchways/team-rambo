import { ICard } from './Card';

export interface IColumn {
  id: string;
  name: string;
  cards: Array<ICard>;
  createdAt: Date;
}
