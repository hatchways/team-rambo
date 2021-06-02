import { ICard } from './';

export default interface IColumn {
  _id: string;
  name: string;
  cards: Array<ICard>;
  createdAt: Date;
}
