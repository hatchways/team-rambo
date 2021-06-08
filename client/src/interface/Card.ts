export interface ICard {
  _id: string;
  columnId: string;
  title: string;
  tag?: string;
  dueDate?: Date;
  description?: string;
  createdAt?: Date;
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
