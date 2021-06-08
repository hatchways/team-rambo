import { Dispatch, SetStateAction } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { IBoard, ICard, IColumn } from './';

export default interface IKanbanContext {
  activeBoard: IBoard;
  focusedCard: ICard | null;
  userBoards: IBoard[];
  addCard: (title: string, tag: string, columnId: string) => void;
  setOpenCard: (card: ICard) => void;
  resetOpenCard: () => void;
  getColumnById: (columnId: string) => IColumn;
  /** Dragging function for columns/cards */
  handleDragEnd: (result: DropResult) => void;
  setActiveBoard: (board: IBoard) => void;
  renameColumn: (
    columnId: string,
    name: string,
    setIsRenaming: Dispatch<SetStateAction<boolean>>,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => void;
  removeColumn: (columnId: string) => void;
  removeBoard: (boardId: string) => void;
  fetchBoard: (id: string) => Promise<IBoard>;
  createNewBoard: (name: string) => Promise<IBoard>;
  moveCard: (destination: IColumn) => void;
  copyCard: (destination: IColumn) => void;
  addColumn: (side: string, name: string) => void;
  updateBoardsName: (id: string, name: string, setSubmitting: (isSubmitting: boolean) => void) => void;
  removeCard: (cardId: string) => void;
}
