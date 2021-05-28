import { DropResult } from 'react-beautiful-dnd';
import { ICard } from './Card';
import { IColumn } from './Column';

export interface IKanbanContext {
  columns: IColumn[];
  focusedCard: ICard | null;
  handleDragEnd: (result: DropResult) => void;
  addCard: (card: ICard) => boolean;
  setOpenCard: (card: ICard) => void;
  resetOpenCard: () => void;
  getColumnById: (columnId: string) => IColumn | null;
}
