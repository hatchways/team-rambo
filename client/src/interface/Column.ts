import { ICard } from './Card';

export interface IColumn {
  _id: string;
  name: string;
  cards: Array<ICard>;
  createdAt: Date;
}
