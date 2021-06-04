import { ICard } from './';

export interface IColumn {
  _id: string;
  name: string;
  cards: Array<ICard>;
  createdAt: Date;
}

export interface ColumnApiData {
  columns: Array<IColumn>;
  error?: { message: string };
}

export interface NewColumnApiData {
  column: IColumn;
  error?: { messge: string };
}
