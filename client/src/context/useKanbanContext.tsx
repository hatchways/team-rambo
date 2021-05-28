import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import cloneDeep from 'lodash.clonedeep';
import { IColumn, ICard, IKanbanContext, IBoard } from '../context/types/kanban';
import getUserBoards from '../helpers/APICalls/getUserBoards';

const initialKanbanData = {
  activeBoard: {} as IBoard,
  addCard: () => false,
  handleDragEnd: () => null,
  setActiveBoard: () => null,
};

export const KanbanContext = createContext<IKanbanContext>(initialKanbanData);

export const KanbanProvider: FunctionComponent = ({ children }): JSX.Element => {
  // Columns here needs to reference a created board, or won't be returning anything
  const [activeBoard, setActiveBoard] = useState<IBoard>({
    _id: 'Initial',
    name: 'Initial',
    columns: [],
    cards: [],
    user: 'Initial',
    createdAt: 'Initial',
  });
  const [columns, setColumns] = useState<IColumn[]>(activeBoard.columns);

  useEffect(() => {
    getFirstBoard();
  }, []);

  // Helper function to set the first board;
  const getFirstBoard = async () => {
    const request = await getUserBoards();
    const board = request.boards[0];
    setActiveBoard(board);

    return board;
  };

  // SetColumns will no longer work as expected as the board is provided in its entirety
  // Need to keep board and columns in sync

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (!columns) return;
    const columnsCopy: IColumn[] = cloneDeep(columns);
    const colIndex = columns.findIndex((col) => col._id === source.droppableId);
    if (source.droppableId === destination.droppableId) {
      if (colIndex > -1) {
        const cards = Array.from(columnsCopy[colIndex].cards);
        const newCards = swapCards(cards, source, destination, draggableId);
        columnsCopy[colIndex].cards = newCards;
        setColumns(columnsCopy);

        return;
      }
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

    setColumns(columnsCopy);

    return;
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
    const columnsCopy = cloneDeep(columns);
    const columnIndex = columnsCopy.findIndex((col) => col._id === card.columnId);
    if (columnIndex > -1) {
      const columnCopy = cloneDeep(columns[columnIndex]);
      columnCopy.cards.push(card);
      columnsCopy[columnIndex] = columnCopy;
      setColumns(columnsCopy);
    }

    return false;
  };

  return (
    <KanbanContext.Provider
      value={{
        activeBoard,
        addCard,
        handleDragEnd,
        setActiveBoard,
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
