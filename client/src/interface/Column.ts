import { ICard } from './Card';

export interface IColumn {
  id: string;
  name: string;
  cards: ICard[];
  createdAt?: Date;
}