export interface ICard {
  [key: string]: string | Array<string> | undefined;
  _id: string;
  title: string;
  tag: string;
  description?: string;
  date?: string;
  comment?: string;
  attachment?: string;
  checklist?: Array<string>;
  columnId: string;
  createdAt?: string;
}

export interface CardApiData {
  cards: Array<ICard>;
  error?: { message: string };
}

export interface NewCardApiData {
  card: ICard;
  error?: { messge: string };
}

export interface ICardUpdateData {
  title?: string;
  tag?: string;
  description?: string;
  deadline?: Date;
  comment?: string;
  attachment?: string;
  checklist?: Array<string>;
  columnId?: string;
}
