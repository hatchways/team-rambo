import React, { useState, useContext, createContext, FunctionComponent } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { columnData } from '../components/Kanban/data';
import { IColumn, ICard, IKanbanContext } from '../context/types/kanban';
import cloneDeep from 'lodash.clonedeep';

const initialKanbanData: IKanbanContext = {
  columns: [] as IColumn[],
  handleDragEnd: () => null,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  addCard: (_: ICard) => false,
};

export const KanbanContext = createContext<IKanbanContext>(initialKanbanData);

export const KanbanProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [columns, setColumns] = useState<Array<IColumn>>(columnData);

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const columnsCopy: IColumn[] = cloneDeep(columns);
    const colIndex = columns.findIndex((col) => col.id === source.droppableId);
    console.log(result);
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
      console.log(cardsCopy);
      return cardsCopy;
    }
    return cards;
  };

  const addCard = (card: ICard): boolean => {
    console.log(card);
    return false;
  };

  return (
    <KanbanContext.Provider
      value={{
        columns,
        handleDragEnd,
        addCard,
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
