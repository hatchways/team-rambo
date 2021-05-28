import { useState, useContext, createContext, FunctionComponent } from 'react';
import { cardDetailItems } from '../components/CardDialog/initialDetailData';
import { IDialogItem, IDialogItemContext } from '../interface/detail';

export const DialogContext = createContext<IDialogItemContext>({} as IDialogItemContext);

export const DialogProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [items, setItems] = useState<Array<IDialogItem>>(cardDetailItems);

  const hasItem = (itemContent: string): boolean => {
    return items.findIndex((item: IDialogItem) => item.content === itemContent) > -1 ? true : false;
  };

  const resetItems = (): void => {
    setItems(cardDetailItems);
  };

  const addItem = (item: IDialogItem): void => {
    if (!hasItem(item.content)) {
      const itemsPlusOne = [...items, item];
      setItems(itemsPlusOne);
    }
  };

  const removeItem = (itemId: string): void => {
    const remaining = items.filter((item) => item.id !== itemId);
    console.log(remaining);
    setItems(remaining);
  };

  return (
    <DialogContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        resetItems,
        hasItem,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export function useDialog(): IDialogItemContext {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error('useDialog must be used within DialogProvider');
  }
  return ctx;
}
