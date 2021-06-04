import { ICard } from './';

export default interface IColumn {
  _id: string;
  name: string;
  cards: Array<ICard>;
  createdAt: Date;
}

export interface ColumnApiData {
  columns: Array<IColumn>;
  error?: { message: string };
}

export interface NewCardApiData {
  column: IColumn;
  error?: { messge: string };
}
