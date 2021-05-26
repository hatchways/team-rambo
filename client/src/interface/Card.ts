export interface ICard {
  id: string;
  columnId: string;
  name: string;
  description?: string;
  tag?: string;
  dueDate?: Date;
  createdAt?: Date;
}