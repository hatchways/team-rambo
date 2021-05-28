import { DropResult } from 'react-beautiful-dnd';

// Will createdAt be a string or date? Inconsistency

export interface IBoard {
  _id: string;
  name: string;
  columns: IColumn[];
  cards: ICard[];
  user: string;
  createdAt: string;
}

export interface IColumn {
  _id: string;
  name: string;
  cards: ICard[];
  createdAt?: Date;
}

export interface ICard {
  _id: string;
  columnId: string;
  name: string;
  description?: string;
  tag?: string;
  dueDate?: Date;
  createdAt?: Date;
}

export interface IKanbanContext {
  activeBoard: IBoard;
  handleDragEnd: (result: DropResult) => void;
  addCard: (card: ICard) => boolean;
  setActiveBoard: (value: IBoard) => void;
}
