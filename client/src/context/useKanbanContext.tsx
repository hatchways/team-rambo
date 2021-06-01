import { useState, useContext, createContext, FunctionComponent } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { columnData } from '../components/Kanban/data';
import { IKanbanContext } from '../interface/KanbanContext';
import { IColumn } from '../interface/Column';
import { ICard } from '../interface/Card';
import cloneDeep from 'lodash.clonedeep';
import { useSnackBar } from './useSnackbarContext';

export const KanbanContext = createContext<IKanbanContext>({} as IKanbanContext);

export const KanbanProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [columns, setColumns] = useState<Array<IColumn>>(columnData);
  const [focusedCard, setFocusedCard] = useState<ICard | null>(null);
  const { updateSnackBarMessage } = useSnackBar();
  const handleDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    const columnsCopy: IColumn[] = cloneDeep(columns);
    const colIndex = columns.findIndex((col) => col.id === source.droppableId);

    if (type === 'column') {
      // reorder the column.
      const reorderedColumns = swapColumns(columnsCopy, source, destination);
      setColumns(reorderedColumns);
      return;
    }

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
      const targetColumnIndex = columnsCopy.findIndex((col) => col.id === destination.droppableId);
      if (targetColumnIndex > -1) {
        const targetColumn = columnsCopy[targetColumnIndex];
        const originalColumn = columnsCopy[colIndex];
        const [card] = originalColumn.cards.splice(source.index, 1);
        card.columnId = targetColumn.id;
        targetColumn.cards.splice(destination.index, 0, card);
      }
    }

    setColumns(columnsCopy);
    return;
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
    const cardIndex = cardsCopy.findIndex((card: ICard) => card.id === draggableId);
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
    const columnIndex = columnsCopy.findIndex((col) => col.id === card.columnId);
    if (columnIndex > -1) {
      const columnCopy = cloneDeep(columns[columnIndex]);
      columnCopy.cards.push(card);
      columnsCopy[columnIndex] = columnCopy;
      setColumns(columnsCopy);
      return true;
    }
    return false;
  };

  const setOpenCard = (card: ICard): void => {
    setFocusedCard(card);
  };
  const resetOpenCard = (): void => setFocusedCard(null);

  const getColumnById = (columnId: string): IColumn | null => {
    if (!columnId) return null;
    const colIndex = columns.findIndex((col) => col.id === columnId);
    if (colIndex > -1) {
      return columns[colIndex];
    }
    return null;
  };

  return (
    <KanbanContext.Provider
      value={{
        columns,
        focusedCard,
        handleDragEnd,
        addCard,
        setOpenCard,
        resetOpenCard,
        getColumnById,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export function useKanban(): IKanbanContext {
  const ctx = useContext(KanbanContext);
  if (!ctx) {
    throw new Error('useKanban must be used within KanbanProvider');
  }
  return ctx;
}
