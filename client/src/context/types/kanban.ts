import { DropResult } from 'react-beautiful-dnd';

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
  tag?: ICardTag;
  dueDate?: Date;
  createdAt?: Date;
}

export interface ICardTag {
  name?: string;
  hexCode: string;
}

export interface IKanbanContext {
  columns: IColumn[];
  handleDragEnd: (result: DropResult) => void;
  addCard: (card: ICard) => boolean;
}
