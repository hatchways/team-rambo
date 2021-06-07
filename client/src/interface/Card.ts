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
