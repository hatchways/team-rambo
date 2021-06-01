import { Dispatch, SetStateAction } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { IBoard, ICard, IColumn } from './';

export interface IKanbanContext {
  activeBoard: IBoard;
  focusedCard: ICard | null;
  addCard: (card: ICard) => boolean;
  setOpenCard: (card: ICard) => void;
  resetOpenCard: () => void;
  getColumnById: (columnId: string) => IColumn | null;
  handleDragEnd: (result: DropResult) => void;
  setActiveBoard: (board: IBoard) => void;
  renameColumn: (
    columnId: string,
    name: string,
    setIsRenaming: Dispatch<SetStateAction<boolean>>,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => void;
  removeColumn: (columnId: string) => void;
  fetchBoard: (id: string) => Promise<IBoard>;
}
