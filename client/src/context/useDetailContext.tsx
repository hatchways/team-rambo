import { useState, useContext, createContext, FunctionComponent } from 'react';
import { columnData } from '../components/Kanban/data';
import { IColumn, ICard, IKanbanContext } from '../context/types/kanban';
import DialogItem from '../components/CardDialog/DialogItem/DialogItem';
import cloneDeep from 'lodash.clonedeep';

const initialDetailData: IKanbanContext = {
  columns: [] as IColumn[],
  handleDragEnd: () => null,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  addCard: (_card: ICard) => false,
};

export const DetailContext = createContext<IKanbanContext>(initialDetailData);

export const DetailProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [items, setItems] = useState<Array<IColumn>>(columnData);

  const addCard = (item: JSX.Element): boolean => {
    const columnsCopy = cloneDeep(columns);
    const columnIndex = columnsCopy.findIndex((col) => col.id === card.columnId);
    if (columnIndex > -1) {
      const columnCopy = cloneDeep(columns[columnIndex]);
      columnCopy.cards.push(card);
      columnsCopy[columnIndex] = columnCopy;
      setItems(columnsCopy);
    }
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
