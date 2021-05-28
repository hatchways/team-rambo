import { DropResult } from 'react-beautiful-dnd';

export interface IBoard {
  _id: string;
  name: string;
  columns: IColumn[];
  cards: ICard[];
  user: string;
  createdAt: string;
}

export interface IColumn {
  id: string;
  name: string;
  cards: ICard[];
  createdAt?: Date;
}

export interface ICard {
  id: string;
  columnId: string;
  name: string;
  description?: string;
  tag?: string;
  dueDate?: Date;
  createdAt?: Date;
}

export interface IKanbanContext {
  columns: IColumn[];
  handleDragEnd: (result: DropResult) => void;
  addCard: (card: ICard) => boolean;
  getFirstBoard: () => Promise<IBoard>;
}
