import { useState, useContext, createContext, FunctionComponent } from 'react';
import { cardDialogItems } from '../components/CardDialog/';
import { IDialogItemContext, IDialogItem } from '../interface';

export const DialogContext = createContext<IDialogItemContext>({} as IDialogItemContext);

export const DialogProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [items, setItems] = useState<Array<IDialogItem>>(cardDialogItems);

  const hasItem = (itemContent: string): boolean => {
    return items.findIndex((item: IDialogItem) => item.content === itemContent) > -1 ? true : false;
  };

  const resetItems = (): void => setItems(cardDialogItems);

  const addItem = (item: IDialogItem): void => {
    const itemsPlusOne = [...items, item];
    setItems(itemsPlusOne);
  };

  const removeItem = (itemContent: string): void => {
    const remaining = items.filter((item) => item.content !== itemContent);
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
  if (!ctx) throw new Error('useDialog must be used within DialogProvider');

  return ctx;
}
