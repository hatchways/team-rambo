export interface ICard {
  _id: string;
  columnId: string;
  name: string;
  tag?: string;
  dueDate?: Date;
  description?: string;
  createdAt?: Date;
}
