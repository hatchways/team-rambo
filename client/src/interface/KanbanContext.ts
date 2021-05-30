import { DropResult } from 'react-beautiful-dnd';
import { IBoard } from './Board';
import { ICard } from './Card';
import { IColumn } from './Column';

export interface IKanbanContext {
  activeBoard: IBoard;
  focusedCard: ICard | null;
  addCard: (card: ICard) => boolean;
  setOpenCard: (card: ICard) => void;
  resetOpenCard: () => void;
  getColumnById: (columnId: string) => IColumn | null;
  handleDragEnd: (result: DropResult) => void;
  setActiveBoard: (board: IBoard) => void;
  renameColumn: (columnId: string) => void;
  removeColumn: (columnId: string) => void;
  fetchBoard: (id: string) => Promise<IBoard>;
}
