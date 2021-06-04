import { Dispatch, SetStateAction } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { IBoard, NewBoardApiData, ICard, IColumn } from './';

export default interface IKanbanContext {
  activeBoard: IBoard;
  focusedCard: ICard | null;
  userBoards: IBoard[];
  addCard: (card: ICard) => boolean;
  setOpenCard: (card: ICard) => void;
  resetOpenCard: () => void;
  getColumnById: (columnId: string) => IColumn;
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
  createNewBoard: (name: string) => Promise<NewBoardApiData>;
  moveCard: (destination: IColumn) => void;
  copyCard: (destination: IColumn) => void;
  removeActiveCard: () => void;
  addColumn: (columnName: string, side: string) => void;
  sendToFirstBoard: () => void;
}
