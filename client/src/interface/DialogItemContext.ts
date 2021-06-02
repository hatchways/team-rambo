import { IDialogItem } from './DialogItem';

export interface IDialogItemContext {
  items: IDialogItem[];
  addItem: (item: IDialogItem) => void;
  removeItem: (itemId: string) => void;
  resetItems: () => void;
  hasItem: (itemContent: string) => boolean;
}
