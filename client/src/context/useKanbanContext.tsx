import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import cloneDeep from 'lodash.clonedeep';
import { getBoard, getUserBoards, updateBoard } from '../helpers/';
import { useSnackBar, useAuth } from './';
import { IKanbanContext, IColumn, ICard, IBoard } from '../interface/';

export const KanbanContext = createContext<IKanbanContext>({} as IKanbanContext);

export const KanbanProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [activeBoard, setActiveBoard] = useState<IBoard>({
    _id: 'Initial',
    name: 'Initial',
    columns: [],
    cards: [],
    user: 'Initial',
    createdAt: 'Initial',
  });
  const [columns, setColumns] = useState<IColumn[]>(activeBoard.columns);
  const [focusedCard, setFocusedCard] = useState<ICard | null>(null);
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser) getFirstBoard();

    return;
  }, [loggedInUser]);

  const getFirstBoard = async (): Promise<IBoard> => {
    const request = await getUserBoards();
    const board = request.boards[0];
    setActiveBoard(board);
    setColumns(board.columns);

    return board;
  };

  const fetchBoard = async (id: string): Promise<IBoard> => {
    const board = await getBoard(id);
    setActiveBoard(board);
    setColumns(board.columns);

    return board;
  };

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) return;

    const { destination, source, draggableId, type } = result;

    const dupBoard = Object.assign({}, activeBoard);
    const columnsCopy: IColumn[] = cloneDeep(columns);
    const colIndex = columns.findIndex((col) => col._id === source.droppableId);

    if (type === 'column') {
      // reorder the column.
      const reorderedColumns = swapColumns(columnsCopy, source, destination);
      dupBoard.columns = reorderedColumns;

      updateBoard(dupBoard);

      setActiveBoard(dupBoard);

      setColumns(reorderedColumns);

      return;
    }

    if (source.droppableId === destination.droppableId && colIndex > -1) {
      const cards = Array.from(columnsCopy[colIndex].cards);
      const newCards = swapCards(cards, source, destination, draggableId);
      columnsCopy[colIndex].cards = newCards;
      dupBoard.columns = columnsCopy;

      updateBoard(dupBoard);

      setActiveBoard(dupBoard);
      setColumns(columnsCopy);

      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const targetColumnIndex = columnsCopy.findIndex((col) => col._id === destination.droppableId);
      if (targetColumnIndex > -1) {
        const targetColumn = columnsCopy[targetColumnIndex];
        const originalColumn = columnsCopy[colIndex];
        const [card] = originalColumn.cards.splice(source.index, 1);
        card.columnId = targetColumn._id;
        targetColumn.cards.splice(destination.index, 0, card);
      }
    }

    dupBoard.columns = columnsCopy;

    updateBoard(dupBoard);
    setActiveBoard(dupBoard);
    setColumns(columnsCopy);
  };

  const swapColumns = (columns: IColumn[], source: DraggableLocation, destination: DraggableLocation): IColumn[] => {
    const [sourceCol] = columns.splice(source.index, 1);
    columns.splice(destination.index, 0, sourceCol);

    return columns;
  };

  const swapCards = (
    cards: ICard[],
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string,
  ): ICard[] => {
    const cardsCopy = [...cards];
    const cardIndex = cardsCopy.findIndex((card: ICard) => card._id === draggableId);
    if (cardIndex > -1) {
      const [card] = cardsCopy.splice(source.index, 1);
      cardsCopy.splice(destination.index, 0, card);

      return cardsCopy;
    }

    return cards;
  };

  const addCard = (card: ICard): boolean => {
    if (card.name === '') {
      updateSnackBarMessage('Please enter a card name');

      return false;
    }

    const columnsCopy = cloneDeep(columns);
    const columnIndex = columnsCopy.findIndex((col) => col._id === card.columnId);
    if (columnIndex > -1) {
      const columnCopy = cloneDeep(columns[columnIndex]);
      columnCopy.cards.push(card);
      columnsCopy[columnIndex] = columnCopy;
      activeBoard.columns = columnsCopy;

      setColumns(columnsCopy);

      updateBoard(activeBoard);

      return true;
    }

    return false;
  };

  const renameColumn = (columnId: string): undefined => {
    const columnsCopy = cloneDeep(columns);

    // setColumns(columnsCopy);

    // updateBoard(activeBoard);

    return undefined;
  };

  const removeColumn = (columnId: string): undefined => {
    const columnsCopy = cloneDeep(columns);

    // setColumns(columnsCopy);

    // updateBoard(activeBoard);

    return undefined;
  };

  const setOpenCard = (card: ICard): void => setFocusedCard(card);

  const resetOpenCard = (): void => setFocusedCard(null);

  const getColumnById = (columnId: string): IColumn | null => {
    const colIndex = columns.findIndex((col) => col._id === columnId);
    if (colIndex > -1) return columns[colIndex];

    return null;
  };

  return (
    <KanbanContext.Provider
      value={{
        activeBoard,
        focusedCard,
        addCard,
        setOpenCard,
        resetOpenCard,
        getColumnById,
        handleDragEnd,
        setActiveBoard,
        renameColumn,
        removeColumn,
        fetchBoard,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export function useKanban(): IKanbanContext {
  const ctx = useContext(KanbanContext);
  if (!ctx) throw new Error('useKanban must be used within KanbanProvider');

  return ctx;
}
