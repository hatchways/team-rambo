import { useState, useContext, createContext, FunctionComponent } from 'react';
import { cardDetailItems } from '../components/CardDialog/initialDetailData';
import { IDialogItemContext, IDialogItem } from '../interface';

export const DialogContext = createContext<IDialogItemContext>({} as IDialogItemContext);

export const DialogProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [items, setItems] = useState<Array<IDialogItem>>(cardDetailItems);

  const swapItems = (items: IDialogItem[], source: string, destination: string, itemId: string): IDialogItem[] => {
    const itemsCopy = [...items];
    const itemIndex = itemsCopy.findIndex((item: IDialogItem) => item.id === itemId);
    if (itemIndex > -1) {
      //    Will need some logic for swapping items
      //   const [item] = itemsCopy.splice(source.index, 1);
      //   itemsCopy.splice(destination.index, 0, item);
      return itemsCopy;
    }
    return items;
  };

  const resetItems = (): boolean => {
    setItems(cardDetailItems);
    return false;
  };

  const addItem = (item: IDialogItem): boolean => {
    const itemsPlusOne = [...items, item];
    setItems(itemsPlusOne);
    return false;
  };

  const removeItem = (itemId: string): boolean => {
    const remaining = items.filter((item) => item.id !== itemId);
    console.log(remaining);
    setItems(remaining);
    return false;
  };

  return (
    <DialogContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        resetItems,
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
